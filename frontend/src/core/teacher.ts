import {requestDelete, requestGet, requestPost, requestPut} from "./common";
import {mapStudent, Student} from "./student";

export interface Teacher {
    teacherId: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    course: string;
}

export interface NewTeacher {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    course: string;
}

export interface EditedTeacher {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    course: string;
}

export function editedTeacher(teacher: Teacher): EditedTeacher {
    return {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        age: teacher.age,
        email: teacher.email,
        course: teacher.course
    };
}


export function studentExists(email: string): Promise<boolean> {
    let queryString = `email=${email}`
    return requestGet(
        `/teachers/searchStudent?${queryString}`,
        (result) => result.length > 0,
        (error) => false);
}



export function teacherExists(email: string, notTeacherId?: number): Promise<boolean> {
    let queryString = `email=${email}`
    if (notTeacherId !== undefined) {
        queryString += `&notTeacherId=${notTeacherId}`;
    }
    return requestGet(
        `/teachers/searchTeacher?${queryString}`,
        (result) => result.length > 0,
        (error) => false);
}

export function getTeachers(): Promise<Teacher[]> {
    return requestGet('/teachers', (results) => results.map(mapTeacher), (error) => []);
}

export function getTeacher(teacherId: number): Promise<Teacher | null> {
    return requestGet(`/teachers/teacherId/${teacherId}`, (result) => mapTeacher(result), (error) => null);
}

export function getTeachersByStudentId(studentId: number): Promise<Teacher[]> {
    return requestGet(`/teachers/studentId/${studentId}`, (results) => results.map(mapTeacher), (error) => []);
}
export function getTeachersByPage(pageNumber: number, sort:unknown): Promise<Teacher[]> {
    return requestGet(`/teachers/page/${pageNumber}/sort/${sort}`, (results) => results.map(mapTeacher), (error) => []);
}

export function searchTeacher(name: unknown): Promise<Teacher[]> {
    return requestGet(`/teachers/searchTeacher/${name}`, (results) => results.map(mapTeacher), (error) => []);
}

export function addTeacher(teacher: NewTeacher): Promise<Teacher | null> {
    return requestPost('/teachers', teacher, mapTeacher, (error) => null);
}

export function updateTeacher(teacherId: number, teacher: EditedTeacher): Promise<boolean> {
    return requestPut(`/teachers/updateTeacher/${teacherId}`, teacher, (result) => true, (error) => false);
}

// export function deleteStudentTeacherConnection(studentId:number, teacherId: number): Promise<Teacher | null> {
//     return requestPut(`/teachers/deleteStudent/${studentId}/Teacher/${teacherId}/Connection`, null, (result) => mapTeacher(result), (error) => null);
// }

export function deleteStudentTeacherConnection(studentId:number, teacherId: number): Promise<boolean> {
    return requestDelete(`/teachers/deleteStudent/${studentId}/Teacher/${teacherId}/Connection`, (result) => true, (error) => false);
}


export function deleteTeacher(teacherId: number): Promise<boolean> {
    return requestDelete(`/teachers/${teacherId}`, (result) => true, (error) => false);
}



export function mapTeacher(data: any): Teacher {
    return ({
        teacherId: data.teacherId,
        firstName: data.firstName,
        lastName: data.lastName,
        age: Number.parseInt(data.age),
        email: data.email,
        course: data.course
    });
}