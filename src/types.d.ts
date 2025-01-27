export interface Project {
    name: string;
    description: string;
    slug: string;
    startDate: Date
    endDate: Date
    publicId: string;
    status: ProjectStatus;
    ownerId: string;
    coOwnerId: string;
    teamMembers: string[];
}

export type ProjectStatus = 'BACKLOG' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ON_HOLD' | 'DELAYED';