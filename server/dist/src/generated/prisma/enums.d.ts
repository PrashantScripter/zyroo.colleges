export declare const Role: {
    readonly STUDENT: "STUDENT";
    readonly COUNSELOR: "COUNSELOR";
    readonly PARENT: "PARENT";
    readonly COLLEGE_REP: "COLLEGE_REP";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const ExamStatus: {
    readonly open: "open";
    readonly upcoming: "upcoming";
    readonly closed: "closed";
};
export type ExamStatus = (typeof ExamStatus)[keyof typeof ExamStatus];
