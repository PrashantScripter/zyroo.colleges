// src/counseling/counseling.service.ts
import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { DRIZZLE } from '../db/db.provider';
import { counselingBookings } from '../db/schema';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import { BookCounselingDto } from './dto/book-counseling.dto';
import axios from 'axios';

@Injectable()
export class CounselingService {
  private brevoApiKey: string;

  constructor(
    @Inject(DRIZZLE) private db: MySql2Database<typeof import('../db/schema')>,
  ) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      throw new Error('BREVO_API_KEY is not defined in environment variables');
    }
    this.brevoApiKey = apiKey;
  }

  async bookSession(dto: BookCounselingDto) {
    try {
      // Insert booking using Drizzle
      const [insertedId] = await this.db
        .insert(counselingBookings)
        .values({
          name: dto.name,
          phone: dto.phone,
          email: dto.email,
          targetCollege: dto.targetCollege,
          stream: dto.stream,
          preferredDate: new Date(dto.preferredDate), // Convert string to Date
          preferredTime: dto.preferredTime,
          concerns: dto.concerns || null,
          userId: dto.userId || null,
        })
        .$returningId(); // Returns the auto-increment ID

      // Send emails
      await this.sendConfirmationEmail(dto);
      await this.sendAdminNotification(dto);

      return {
        success: true,
        message:
          'Counseling session booked successfully. We have sent you a confirmation email.',
        bookingId: insertedId,
      };
    } catch (error) {
      console.error('Error booking counseling session:', error);
      throw new InternalServerErrorException(
        'Failed to book counseling session. Please try again later.',
      );
    }
  }

  // Email methods remain unchanged
  private async sendEmail(
    to: string,
    toName: string,
    subject: string,
    htmlContent: string,
  ) {
    const senderEmail =
      process.env.BREVO_SENDER_EMAIL || 'noreply@zyroocolleges.com';
    const senderName = 'Zyroo Colleges';

    try {
      await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          sender: { email: senderEmail, name: senderName },
          to: [{ email: to, name: toName }],
          subject,
          htmlContent,
        },
        {
          headers: {
            'api-key': this.brevoApiKey,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error: any) {
      console.error(
        'Brevo email send error:',
        error.response?.data || error.message,
      );
      throw new InternalServerErrorException(
        'Failed to send email notification.',
      );
    }
  }

  private async sendConfirmationEmail(dto: BookCounselingDto) {
    const subject = 'Counseling Session Confirmed – Zyroo Colleges';
    const htmlContent = `
      <h2>Hello ${dto.name},</h2>
      <p>Thank you for booking a free counseling session with Zyroo Colleges.</p>
      <p><strong>Session Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${dto.preferredDate}</li>
        <li><strong>Time:</strong> ${dto.preferredTime}</li>
        <li><strong>Target College:</strong> ${dto.targetCollege}</li>
        <li><strong>Stream:</strong> ${dto.stream}</li>
      </ul>
      <p>One of our expert counselors will contact you at your provided phone number (<strong>${dto.phone}</strong>) on the scheduled date.</p>
      <p>If you have any questions, feel free to reply to this email.</p>
      <p>Best regards,<br/>Team Zyroo Colleges</p>
    `;
    await this.sendEmail(dto.email, dto.name, subject, htmlContent);
  }

  private async sendAdminNotification(dto: BookCounselingDto) {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@zyroocolleges.com';
    const subject = 'New Counseling Booking Request';
    const htmlContent = `
      <h2>New Counseling Booking</h2>
      <p><strong>Name:</strong> ${dto.name}</p>
      <p><strong>Phone:</strong> ${dto.phone}</p>
      <p><strong>Email:</strong> ${dto.email}</p>
      <p><strong>Target College:</strong> ${dto.targetCollege}</p>
      <p><strong>Stream:</strong> ${dto.stream}</p>
      <p><strong>Preferred Date:</strong> ${dto.preferredDate}</p>
      <p><strong>Preferred Time:</strong> ${dto.preferredTime}</p>
      ${dto.concerns ? `<p><strong>Concerns:</strong> ${dto.concerns}</p>` : ''}
    `;
    await this.sendEmail(adminEmail, 'Admin', subject, htmlContent);
  }
}
