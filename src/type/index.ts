export type UserRole = "ADMIN" | "EMPLOYEE";

export type UserStatus = "ACTIVE" | "BLOCKED";

export type NotificationType = "EXPENSE" | "PROJECT" | "ATTENDANCE" | "SYSTEM";

export type ReferenceType = "PROJECT" | "EXPENSE" | "ASSIGNMENT";

export type ExpensesStatus = "PENDING" | "APPROVED" | "REJECTED";

export type AttendanceStatus =
| "NOT_STARTED"
| "CHECKED_IN"
| "ON_BREAK"
| "BREAK_ENDED"
| "CHECKED_OUT";

export type AssignedEmployeeRole = "RUNNER" | "PICKER";

export type ProjectStatus =
| "PENDING"
| "STAGING"
| "WALKTHROUGH"
| "DESTAGING"
| "COMPLETED";

// ================= USER =================
export interface User {
id: string;
name: string;
email: string;
phone?: string;
photo?: string;
role: UserRole;
status: UserStatus;

isDeleted: boolean;
createdAt: Date;
updatedAt: Date;

assignedEmployees?: AssignedEmployee[];
credential?: Credential;
expenses?: Expenses[];

notifications?: Notification[];
sentNotifications?: Notification[];
}

// ================= CREDENTIAL =================
export interface Credential {
id: string;
password: string;
otp?: string;
otpExpireAt?: Date;

createdAt: Date;
updatedAt: Date;

userId: string;
user?: User;
}

// ================= PROJECT =================
export interface Project {
id: string;
name: string;
clientName: string;

propertyAddress: string;
accessInfo?: string;
notes?: string;
status: ProjectStatus;

lastWorkingDate?: Date;
createdAt: Date;
updatedAt: Date;

expenses?: Expenses[];
assignedEmployees?: AssignedEmployee[];
}

// ================= ASSIGNED EMPLOYEE =================
export interface AssignedEmployee {
id: string;
role: AssignedEmployeeRole;

checkIn?: Date;
checkOut?: Date;
breakTimeStart?: Date;
breakTimeEnd?: Date;

status: AttendanceStatus;

projectId: string;
project?: Project;

employeeId: string;
employee?: User;

createdAt: Date;
updatedAt: Date;
}

// ================= EXPENSES =================
export interface Expenses {
id: string;
category: string;

projectId: string;
project?: Project;

employeeId: string;
employee?: User;

amount: number;
description?: string;
receiptDocImage?: string;

status: ExpensesStatus;
feedback?: string;

createdAt: Date;
updatedAt: Date;
}

// ================= NOTIFICATION =================
export interface Notification {
id: string;

title: string;
message: string;
type: NotificationType;

referenceId?: string;
referenceType?: ReferenceType;

receiverId: string;
receiver?: User;

senderId?: string;
sender?: User;

isRead: boolean;
createdAt: Date;
}
