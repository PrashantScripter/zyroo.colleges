import { CollegesService } from './colleges.service';
import { GetCollegesQueryDto } from './dto/get-colleges-query.dto';
export declare class CollegesController {
    private readonly collegesService;
    constructor(collegesService: CollegesService);
    findAll(query: GetCollegesQueryDto): Promise<{
        data: {
            courses: any[];
            id: number;
            name: string;
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
            facilities: string[] | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        courses: {
            id: number;
            collegeId: number;
            key: string;
            name: string;
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
            createdAt: Date | null;
            updatedAt: Date | null;
        }[];
        id: number;
        name: string;
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
        facilities: string[] | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
}
