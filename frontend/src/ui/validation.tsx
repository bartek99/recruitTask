export function validateAge(value: string): boolean {
    if (parseInt(value) <= 18) {
        return false;
    }
    return true;
}

