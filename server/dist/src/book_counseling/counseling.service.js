"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounselingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = __importDefault(require("axios"));
let CounselingService = class CounselingService {
    prisma;
    brevoApiKey;
    constructor(prisma) {
        this.prisma = prisma;
        const apiKey = process.env.BREVO_API_KEY;
        if (!apiKey) {
            throw new Error('BREVO_API_KEY is not defined in environment variables');
        }
        this.brevoApiKey = apiKey;
    }
    async bookSession(dto) {
        try {
            const booking = await this.prisma.counselingBooking.create({
                data: {
                    name: dto.name,
                    phone: dto.phone,
                    email: dto.email,
                    targetCollege: dto.targetCollege,
                    stream: dto.stream,
                    preferredDate: new Date(dto.preferredDate),
                    preferredTime: dto.preferredTime,
                    concerns: dto.concerns,
                    userId: dto.userId,
                },
            });
            await this.sendConfirmationEmail(dto);
            await this.sendAdminNotification(dto);
            return {
                success: true,
                message: 'Counseling session booked successfully. We have sent you a confirmation email.',
                bookingId: booking.id,
            };
        }
        catch (error) {
            console.error('Error booking counseling session:', error);
            throw new common_1.InternalServerErrorException('Failed to book counseling session. Please try again later.');
        }
    }
    async sendEmail(to, toName, subject, htmlContent) {
        const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@zyroocolleges.com';
        const senderName = 'Zyroo Colleges';
        try {
            await axios_1.default.post('https://api.brevo.com/v3/smtp/email', {
                sender: { email: senderEmail, name: senderName },
                to: [{ email: to, name: toName }],
                subject,
                htmlContent,
            }, {
                headers: {
                    'api-key': this.brevoApiKey,
                    'Content-Type': 'application/json',
                },
            });
        }
        catch (error) {
            console.error('Brevo email send error:', error.response?.data || error.message);
            throw new common_1.InternalServerErrorException('Failed to send email notification.');
        }
    }
    async sendConfirmationEmail(dto) {
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
    async sendAdminNotification(dto) {
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
};
exports.CounselingService = CounselingService;
exports.CounselingService = CounselingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CounselingService);
//# sourceMappingURL=counseling.service.js.map