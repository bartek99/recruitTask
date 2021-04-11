
import axios from 'axios';

export function requestGet<R>(path: string, mapResult: (result: any) => R, mapError: (error: string) => R): Promise<R> {
    return new Promise<R>((resolve, reject) => {
            axios
                .get('http://localhost:8090' + path, config())
                .then((response) => handleResponse(
                    response,
                    (result) => resolve(mapResult(result)),
                    (error) => resolve(mapError(error))))
                .catch(reject);
    });
}

export function requestPost<T, R>(path: string, data: T, mapResult: (result: any) => R, mapError: (error: string) => R): Promise<R> {
    return new Promise<R>((resolve, reject) => {
            axios
                .post('http://localhost:8090' + path, data, config())
                .then((response) => handleResponse(
                    response,
                    (result) => resolve(mapResult(result)),
                    (error) => resolve(mapError(error))))
                .catch(reject);
    });
}

export function requestPut<T, R>(path: string, data: T, mapResult: (result: any) => R, mapError: (error: string) => R): Promise<R> {
    return new Promise<R>((resolve, reject) => {
            axios
                .put('http://localhost:8090' + path, data)
                .then((response) => handleResponse(
                    response,
                    (result) => resolve(mapResult(result)),
                    (error) => resolve(mapError(error))))
                .catch(reject);
    });
}

export function requestDelete<R>(path: string, mapResult: (result: any) => R, mapError: (error: string) => R): Promise<R> {
    return new Promise<R>((resolve, reject) => {
            axios
                .delete('http://localhost:8090' + path)
                .then((response) => handleResponse(
                    response,
                    (result) => resolve(mapResult(result)),
                    (error: string) => resolve(mapError(error))))
                .catch(reject);

    });
}
export function config() {
    return {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };
}


export function handleResponse(response: any, onResult: (result: any) => void, onError: (error: string) => void) {
    if (response.data.result !== undefined) {
        onResult(response.data.result);
    } else {
        onError(response.data.error);
    }
}