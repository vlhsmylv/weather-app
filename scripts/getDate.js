export default function getDate() {
    const date = new Date();

    const dateSet = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    }

    return dateSet;
}