export async function fetchLaunches2020() {
    const res = await fetch("https://api.spacexdata.com/v3/launches?launch_year=2020")
    if(!res.ok) throw new Error("Ошибка загрузки");
    return res.json()
}