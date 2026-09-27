export async function getStudents() {

  const response = await fetch(
    `${import.meta.env.BASE_URL}students.json`
  )

  if (!response.ok) {
    throw new Error("ไม่พบไฟล์ students.json")
  }

  const data = await response.json()

  return data.students || []
}