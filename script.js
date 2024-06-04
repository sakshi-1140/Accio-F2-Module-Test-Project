let students = [];

fetch(
  "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    students = data;
    displayTable(students);
  });

function displayTable(data) {
  const tableBody = document
    .getElementById("studentTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";
  data.forEach((student, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${student.img_src}" alt="Profile Image" style="width: 38px; height: 38px; border-radius: 50%; border=1px;"> 
            ${student.first_name} ${student.last_name}</td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? "Passing" : "Failed"}</td>
            <td>${student.email}</td>
        `;
  });
}

function searchTable() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredStudents = students.filter(
    (student) =>
      student.first_name.toLowerCase().includes(searchInput) ||
      student.last_name.toLowerCase().includes(searchInput) ||
      student.email.toLowerCase().includes(searchInput)
  );
  displayTable(filteredStudents);
}

function sortTable(key, order) {
  const sortedStudents = [...students].sort((a, b) => {
    if (key === "name") {
      const fullNameA = `${a.first_name} ${a.last_name}`;
      const fullNameB = `${b.first_name} ${b.last_name}`;
      if (fullNameA < fullNameB) return order === "asc" ? -1 : 1;
      if (fullNameA > fullNameB) return order === "asc" ? 1 : -1;
      return 0;
    } else {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    }
  });
  displayTable(sortedStudents);
}

function filterPassing() {
  const passingStudents = students.filter((student) => student.passing);
  displayTable(passingStudents);
}

function sortByGender() {
    const maleStudents = students.filter(
      (student) => student.gender.toLowerCase() === "male"
    );
    const femaleStudents = students.filter(
      (student) => student.gender.toLowerCase() === "female"
    );
    
    const sortedStudents = [...maleStudents, ...femaleStudents];
  
    displayTable(sortedStudents);
  }
  