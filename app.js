document.addEventListener('DOMContentLoaded', () => {
  const dt = document.querySelector('input[type="datetime-local"]');
  if (dt && !dt.value) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    dt.value = now.toISOString().slice(0, 16);
  }

  document.querySelectorAll('.quiz-card').forEach((card) => {
    const answer = card.dataset.answer;
    const submitBtn = card.querySelector('.quiz-submit');
    const revealBtn = card.querySelector('.quiz-reveal');
    const resultBox = card.querySelector('.result-box');
    const resultTitle = card.querySelector('.result-title');
    const resultAnswer = card.querySelector('.result-answer');

    function showResult(selectedValue, forcedReveal = false) {
      resultBox.classList.remove('hidden', 'correct', 'incorrect');
      resultAnswer.textContent = `Correct answer: ${answer}`;
      if (forcedReveal) {
        resultTitle.textContent = 'Answer revealed';
      } else if (!selectedValue) {
        resultTitle.textContent = 'Select an option first';
      } else if (selectedValue === answer) {
        resultTitle.textContent = 'Correct';
        resultBox.classList.add('correct');
      } else {
        resultTitle.textContent = 'Not quite';
        resultBox.classList.add('incorrect');
      }
    }

    submitBtn?.addEventListener('click', () => {
      const selected = card.querySelector('input[type="radio"]:checked');
      showResult(selected ? selected.value : '', false);
    });

    revealBtn?.addEventListener('click', () => {
      showResult('', true);
    });
  });
});
