document.addEventListener("DOMContentLoaded", () => {
    const subjectsBySemester = {
        "1": {
            theory: ["Applied Physics", "Problem Solving Programming", "Basic Electrical Engineering", "Engineering Drawing", "Linear Algebra"],
            lab: ["PSP Lab", "EP Lab", "IT Workshop"]
        },
        "2": {
            theory: ["Data Structures", "Engineering Chemistry", "Differentiation & Calculus", "MFCS", "Engineering English"],
            lab: ["DELL Lab", "EC Lab", "DS Lab"]
        },
        "3": {
            theory: ["Probability & Statics", "Python Programming", "DBMS", "FLAT", "Business Environment"],
            lab: ["Python Lab", "DBMS", "USP Lab"]
        },
        "4": {
            theory: ["Digital Logic Design", "EMCS", "Java Programming", "ADSA", "Management Science", "AARC"],
            lab: ["DLD Lab", "JP Lab", "ADSA Lab"]
        },
        "5": {
            theory: ["Operating System", "FSAD", "EEA", "DVBA", "IIIPM"],
            lab: ["WCS Lab", "AWAD Lab", "DVBA Lab"]
        },
        "6": {
            theory: ["Computer Network", "SEBA", "BDA", "MFCS", "MR & MM"],
            lab: ["BC&VS Lab", "SDT Lab", "AP Lab"]
        },
        "7": {
            theory: ["MLF", "CS&CL", "PM", "ITPM", "RM&T"],
            lab: ["CSP", "Internship"]
        },
        "8": {
            theory: ["Major Project"],
            lab: ["Major Project"]
        },
        // Add more semesters as needed
    };

    const maxTheory = 4;
    const maxLab = 2;

    let selectedTheoryCount = 0;
    let selectedLabCount = 0;

    const semesterDropdown = document.getElementById('semester-dropdown');
    const theoryDropdown = document.getElementById('theory-dropdown');
    const labDropdown = document.getElementById('lab-dropdown');
    const selectedTheoryList = document.getElementById('selected-theory');
    const selectedLabList = document.getElementById('selected-lab');
    const theoryCountDisplay = document.getElementById('theory-count');
    const labCountDisplay = document.getElementById('lab-count');
    const nextButton = document.getElementById('next-button');

    // Populate semester dropdown
    semesterDropdown.addEventListener('change', () => {
        const semester = semesterDropdown.value;

        // Clear previous selections
        theoryDropdown.innerHTML = '<option value="" disabled selected>Select Theory Subject</option>';
        labDropdown.innerHTML = '<option value="" disabled selected>Select Lab Subject</option>';
        selectedTheoryList.innerHTML = '';
        selectedLabList.innerHTML = '';
        selectedTheoryCount = 0;
        selectedLabCount = 0;
        updateCountDisplay();
        nextButton.disabled = true; // Disable next button until selections are made

        // Populate dropdowns based on selected semester
        if (subjectsBySemester[semester]) {
            subjectsBySemester[semester].theory.forEach(subject => {
                let option = document.createElement('option');
                option.value = subject;
                option.innerText = subject;
                theoryDropdown.appendChild(option);
            });

            subjectsBySemester[semester].lab.forEach(subject => {
                let option = document.createElement('option');
                option.value = subject;
                option.innerText = subject;
                labDropdown.appendChild(option);
            });

            theoryDropdown.disabled = false; // Enable theory dropdown
            labDropdown.disabled = false; // Enable lab dropdown
        }
    });

    // Event listeners for selecting subjects
    theoryDropdown.addEventListener('change', () => {
        if (selectedTheoryCount < maxTheory) {
            if (!isSubjectSelected(theoryDropdown.value, selectedTheoryList)) {
                addSubject(theoryDropdown.value, selectedTheoryList);
                selectedTheoryCount++;
                updateCountDisplay(); // Update counter display
            } else {
                alert("This theory subject is already selected.");
            }
            theoryDropdown.value = "";
            checkNextButton(); // Check if next button can be enabled
        } else {
            alert("You can only select up to 4 theory subjects.");
        }
    });

    labDropdown.addEventListener('change', () => {
        if (selectedLabCount < maxLab) {
            if (!isSubjectSelected(labDropdown.value, selectedLabList)) {
                addSubject(labDropdown.value, selectedLabList);
                selectedLabCount++;
                updateCountDisplay(); // Update counter display
            } else {
                alert("This lab subject is already selected.");
            }
            labDropdown.value = "";
            checkNextButton(); // Check if next button can be enabled
        } else {
            alert("You can only select up to 2 lab subjects.");
        }
    });

    // Function to add subject to the list
    function addSubject(subject, list) {
        let listItem = document.createElement('li');
        listItem.innerText = subject;
        list.appendChild(listItem);
    }

    // Function to check if a subject is already selected
    function isSubjectSelected(subject, list) {
        const selectedSubjects = list.getElementsByTagName('li');
        for (let i = 0; i < selectedSubjects.length; i++) {
            if (selectedSubjects[i].innerText === subject) {
                return true;
            }
        }
        return false;
    }

    // Function to update the count display for selected subjects
    function updateCountDisplay() {
        theoryCountDisplay.innerText = `Selected Theory Subjects: ${selectedTheoryCount}/${maxTheory}`;
        labCountDisplay.innerText = `Selected Lab Subjects: ${selectedLabCount}/${maxLab}`;
    }

    // Function to check if the next button can be enabled
    function checkNextButton() {
        if (selectedTheoryCount > 0 || selectedLabCount > 0) {
            nextButton.disabled = false;
        } else {
            nextButton.disabled = true;
        }
    }

    // Next button click event
nextButton.addEventListener('click', () => {
    const selectedSubjects = {
        theory: Array.from(selectedTheoryList.getElementsByTagName('li')).map(item => item.innerText),
        lab: Array.from(selectedLabList.getElementsByTagName('li')).map(item => item.innerText),
    };
    
    // Store selected subjects in localStorage
    localStorage.setItem('selectedSubjects', JSON.stringify(selectedSubjects));

    // Redirect to teachers page
    window.location.href = 'teachers.html';
});


    // Initial count display
    updateCountDisplay();
});
 
