
    
        // Constants & State Setup
        const BASE_VOTE_COUNT = 15000;
        const VOTE_STORAGE_KEY = 'mbulo_odindo_vote_count';
        const USER_VOTED_KEY = 'mbulo_odindo_has_voted';

        // DOM Element References
        const voteCountDisplay = document.getElementById('vote-count-display');
        const castVoteBtn = document.getElementById('cast-vote-btn');
        const userStatusText = document.getElementById('user-status-text');
        const toastContainer = document.getElementById('toast-container');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const feedbackForm = document.getElementById('feedback-form');
        const formSuccessMsg = document.getElementById('form-success-msg');

        // Initialize Vote Count from LocalStorage or Constant Default
        function getStoredVoteCount() {
            const stored = localStorage.getItem(VOTE_STORAGE_KEY);
            if (!stored) {
                localStorage.setItem(VOTE_STORAGE_KEY, BASE_VOTE_COUNT.toString());
                return BASE_VOTE_COUNT;
            }
            return parseInt(stored, 10);
        }

        // Format Number with Commas
        function formatNumber(num) {
            return num.toLocaleString();
        }

        // Update UI State for Voting
        function updateVoteUI() {
            const currentCount = getStoredVoteCount();
            voteCountDisplay.innerText = formatNumber(currentCount);

            const hasVoted = localStorage.getItem(USER_VOTED_KEY) === 'true';
            
            if (hasVoted) {
                castVoteBtn.classList.remove('bg-brandOrange', 'hover:bg-brandOrangeDark', 'pulse-subtle');
                castVoteBtn.classList.add('bg-emerald-600', 'cursor-default');
                castVoteBtn.innerHTML = `<i class="fa-solid fa-circle-check text-2xl"></i> <span>YOU HAVE PLEDGED YOUR VOTE</span>`;
                userStatusText.innerHTML = `<span class="text-emerald-300 font-bold"><i class="fa-solid fa-check-double mr-1"></i> Your support pledge is active & counted! Thank you.</span>`;
            }
        }

        // Animated Increment Effect
        function animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const current = Math.floor(progress * (end - start) + start);
                element.innerText = formatNumber(current);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    element.innerText = formatNumber(end);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Cast Vote Event Handler
        function handleCastVote() {
            const hasVoted = localStorage.getItem(USER_VOTED_KEY) === 'true';
            if (hasVoted) {
                showToast("You have already recorded your vote pledge!");
                return;
            }

            let currentCount = getStoredVoteCount();
            let newCount = currentCount + 1;

            localStorage.setItem(VOTE_STORAGE_KEY, newCount.toString());
            localStorage.setItem(USER_VOTED_KEY, 'true');

            // Animate number increment from previous to new value
            animateValue(voteCountDisplay, currentCount, newCount, 800);

            // Update UI buttons and trigger toast
            setTimeout(() => {
                updateVoteUI();
                showToast("Thank you! Your pledge vote for Steven Mbulo Odindo has been counted.");
            }, 300);
        }

        // Toast Functions
        function showToast(message) {
            toastContainer.classList.remove('translate-y-32');
            toastContainer.classList.add('translate-y-0');
            setTimeout(() => {
                hideToast();
            }, 5000);
        }

        function hideToast() {
            toastContainer.classList.remove('translate-y-0');
            toastContainer.classList.add('translate-y-32');
        }

        // Mobile Menu Toggle
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Form Submission Simulation
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formSuccessMsg.classList.remove('hidden');
            feedbackForm.reset();
            setTimeout(() => {
                formSuccessMsg.classList.add('hidden');
            }, 6000);
        });

        // On Page Load Event
        window.addEventListener('DOMContentLoaded', () => {
            updateVoteUI();
            castVoteBtn.addEventListener('click', handleCastVote);
        });