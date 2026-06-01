// main.js - 메인 페이지 인터랙션 로직

document.addEventListener('DOMContentLoaded', () => {
    const checklistItems = document.querySelectorAll('#preparation-checklist input[type="checkbox"]');
    const progressBar = document.getElementById('checklist-progress');
    const progressRatio = document.getElementById('checklist-ratio');

    function updateProgress() {
        const total = checklistItems.length;
        const checked = document.querySelectorAll('#preparation-checklist input[type="checkbox"]:checked').length;
        
        if(progressBar) {
            progressBar.style.width = `${(checked / total) * 100}%`;
        }
        if(progressRatio) {
            progressRatio.textContent = `${checked}/${total}`;
        }
    }

    checklistItems.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('label');
            if (this.checked) {
                label.classList.add('checked');
            } else {
                label.classList.remove('checked');
            }
            updateProgress();
        });
    });

    // Initialize progress on load
    updateProgress();
});
