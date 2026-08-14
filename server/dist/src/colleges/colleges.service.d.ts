import { PrismaService } from '../prisma/prisma.service';
import { GetCollegesQueryDto } from './dto/get-colleges-query.dto';
export declare class CollegesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: GetCollegesQueryDto): Promise<{
        data: ({
            courses: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                collegeId: number;
                key: string;
                fees: number;
                hostelFees: number;
                avgPackage: number;
                medianPackage: number;
                highestPackage: number;
                placementRate: number;
                cutoff: string;
                acceptedExams: string;
                duration: string;
                seats: number;
            }[];
        } & {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            location: string;
            stream: string;
            category: string;
            nirfRank: number;
            naacGrade: string | null;
            annualFees: number;
            rating: number;
            image: string;
            established: number | null;
            campusSize: number | null;
            phdFacultyPct: number | null;
            ratingAcademics: number | null;
            ratingPlacements: number | null;
            ratingInfrastructure: number | null;
            ratingCampusLife: number | null;
            facilities: import("@prisma/client/runtime/client").JsonValue | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<({
        courses: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            collegeId: number;
            key: string;
            fees: number;
            hostelFees: number;
            avgPackage: number;
            medianPackage: number;
            highestPackage: number;
            placementRate: number;
            cutoff: string;
            acceptedExams: string;
            duration: string;
            seats: number;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
        stream: string;
        category: string;
        nirfRank: number;
        naacGrade: string | null;
        annualFees: number;
        rating: number;
        image: string;
        established: number | null;
        campusSize: number | null;
        phdFacultyPct: number | null;
        ratingAcademics: number | null;
        ratingPlacements: number | null;
        ratingInfrastructure: number | null;
        ratingCampusLife: number | null;
        facilities: import("@prisma/client/runtime/client").JsonValue | null;
    }) | null>;
}
