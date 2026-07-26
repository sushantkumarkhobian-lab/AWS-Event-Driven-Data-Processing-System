const API_URL = "https://<api-id>.execute-api.<region>.amazonaws.com/prod/students"; //Replace with your Invoke URL

let allStudents = [];

async function loadStudents() {
    const refreshBtn = document.getElementById("refreshBtn");
    if (refreshBtn) refreshBtn.querySelector("i")?.classList.add("fa-spin");

    try {
        const response = await fetch(API_URL);
        const students = await response.json();
        
        allStudents = Array.isArray(students) ? students : [];

        // Update Stats & Render
        updateDashboardMetrics(allStudents);
        renderStudentsTable();

        // Update elements expected by backend/UI
        const countElem = document.getElementById("count");
        if (countElem) countElem.innerText = allStudents.length;

        const updatedElem = document.getElementById("updated");
        if (updatedElem) updatedElem.innerText = new Date().toLocaleTimeString();

    } catch (err) {
        console.error("Error fetching student data:", err);
    } finally {
        if (refreshBtn) {
            setTimeout(() => {
                refreshBtn.querySelector("i")?.classList.remove("fa-spin");
            }, 500);
        }
    }
}

function updateDashboardMetrics(students) {
    if (!students.length) return;

    // Calculate Average Marks
    const totalMarks = students.reduce((acc, curr) => acc + Number(curr.marks || 0), 0);
    const avg = (totalMarks / students.length).toFixed(1);
    const avgElem = document.getElementById("avg-marks");
    if (avgElem) avgElem.innerText = avg;

    // Calculate Top Score
    const topScore = Math.max(...students.map(s => Number(s.marks || 0)));
    const topElem = document.getElementById("top-score");
    if (topElem) topElem.innerText = topScore;

    // Unique Cities Count
    const cities = new Set(students.map(s => s.city).filter(Boolean));
    const citiesElem = document.getElementById("cities-count");
    if (citiesElem) citiesElem.innerText = cities.size;
}

function getGradeClass(grade) {
    if (!grade) return "grade-c";
    const g = String(grade).trim().toUpperCase();
    if (g === "A+") return "grade-aplus";
    if (g === "A") return "grade-a";
    if (g === "B") return "grade-b";
    if (g === "C") return "grade-c";
    if (g === "F") return "grade-f";
    return "grade-b";
}

function getAvatarInitials(name) {
    if (!name) return "ST";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
}

function renderStudentsTable() {
    const tbody = document.querySelector("#studentTable tbody");
    const emptyState = document.getElementById("emptyState");
    if (!tbody) return;

    const searchTerm = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();
    const selectedGrade = (document.getElementById("gradeFilter")?.value || "ALL").toUpperCase();

    const filtered = allStudents.filter(student => {
        const studentName = String(student.student || "").toLowerCase();
        const city = String(student.city || "").toLowerCase();
        const grade = String(student.grade || "").toLowerCase();

        const matchesSearch = !searchTerm || 
            studentName.includes(searchTerm) || 
            city.includes(searchTerm) || 
            grade.includes(searchTerm);

        const matchesGrade = selectedGrade === "ALL" || 
            String(student.grade || "").trim().toUpperCase() === selectedGrade;

        return matchesSearch && matchesGrade;
    });

    tbody.innerHTML = "";

    if (filtered.length === 0) {
        if (emptyState) emptyState.classList.remove("hidden");
        return;
    }

    if (emptyState) emptyState.classList.add("hidden");

    filtered.forEach(student => {
        const studentName = student.student || "N/A";
        const avatarText = getAvatarInitials(studentName);
        const gradeClass = getGradeClass(student.grade);
        const processedTime = student.processedAt 
            ? new Date(student.processedAt).toLocaleString() 
            : "N/A";

        const rowHtml = `
            <tr>
                <td>
                    <div class="student-cell">
                        <div class="student-avatar">${avatarText}</div>
                        <span>${studentName}</span>
                    </div>
                </td>
                <td>
                    <span class="marks-pill">${student.marks ?? '0'}</span>
                </td>
                <td>
                    <span class="grade-badge ${gradeClass}">${student.grade || 'N/A'}</span>
                </td>
                <td>
                    <span class="city-cell">
                        <i class="fa-solid fa-location-dot"></i>
                        ${student.city || 'N/A'}
                    </span>
                </td>
                <td>
                    <span class="time-cell">
                        <i class="fa-regular fa-clock"></i>
                        ${processedTime}
                    </span>
                </td>
            </tr>
        `;
        tbody.innerHTML += rowHtml;
    });
}

// Event Listeners for Filters & Refresh
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const gradeFilter = document.getElementById("gradeFilter");
    const refreshBtn = document.getElementById("refreshBtn");

    if (searchInput) searchInput.addEventListener("input", renderStudentsTable);
    if (gradeFilter) gradeFilter.addEventListener("change", renderStudentsTable);
    if (refreshBtn) refreshBtn.addEventListener("click", loadStudents);
});

// Initial fetch & interval timer
loadStudents();
setInterval(loadStudents, 5000);