import {requestDelete, requestGet, requestPost, requestPut} from "./common";

export function addStudentToTeacher(studentId: number, teacherId: number) {
    return requestPost(`/students/addStudentToTeacher`, {studentId, teacherId }, (result) => true, (error) => false);
}


export interface Student {
    studentId: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    subject: string;

}

export interface NewStudent {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    subject: string;
}

export interface EditedStudent {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    subject: string;
}

export function editedStudent(student: Student): EditedStudent {
    return {
        firstName: student.firstName,
        lastName: student.lastName,
        age: student.age,
        email: student.email,
        subject: student.subject
    };
}

export function studentExists(email: string, notStudentId?: number): Promise<boolean> {
    let queryString = `email=${email}`
    if (notStudentId !== undefined) {
        queryString += `&notStudentId=${notStudentId}`;
    }
    return requestGet(
        `/students/searchStudent?${queryString}`,
        (result) => result.length > 0,
        (error) => false);
}



export function teacherExists(email: string): Promise<boolean> {
    let queryString = `email=${email}`
    return requestGet(
        `/students/searchTeacher?${queryString}`,
        (result) => result.length > 0,
        (error) => false);
}
export function getStudents(): Promise<Student[]> {
    return requestGet(`/students`, (results) => results.map(mapStudent), (error) => []);
}


export function getStudentsByPage(pageNumber: number, sort:unknown): Promise<Student[]> {
    return requestGet(`/students/page/${pageNumber}/sort/${sort}`, (results) => results.map(mapStudent), (error) => []);
}

export function getStudent(studentId: number): Promise<Student | null> {
    return requestGet(`/students/studentId/${studentId}`, (result) => mapStudent(result), (error) => null);
}

export function getStudentsByTeacherId(teacherId: number): Promise<Student[]> {
    return requestGet(`/students/teacherId/${teacherId}`, (results) => results.map(mapStudent), (error) => []);
}

export function searchStudent(name: unknown): Promise<Student[]> {
    return requestGet(`/students/searchStudent/${name}`, (results) => results.map(mapStudent), (error) => []);
}

export function addStudent(student: NewStudent): Promise<Student | null> {
    return requestPost('/students', student, mapStudent, (error) => null);
}

export function updateStudent(studentId: number, student: EditedStudent): Promise<boolean> {
    return requestPut(`/students/updateStudent/${studentId}`, student, (result) => true, (error) => false);
}

export function deleteStudentTeacherConnection(teacherId:number, studentId: number): Promise<boolean> {
    return requestDelete(`/students/deleteTeacher/${teacherId}/Student/${studentId}/Connection`, (result) => true, (error) => false);
}


export function deleteStudent(studentId: number): Promise<boolean> {
    return requestDelete(`/students/${studentId}`, (result) => true, (error) => false);
}

export function mapStudent(data: any): Student {
    return ({
        studentId: data.studentId,
        firstName: data.firstName,
        lastName: data.lastName,
        age: Number.parseInt(data.age),
        email: data.email,
        subject: data.subject
    });
}