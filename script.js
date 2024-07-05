
    const suggestions = ["site", "filetype", "intitle", "inurl", "intext", "inanchor", "cache", "ip", "linkfromdomain"];
    let currentIndex = -1;

    document.getElementById('autocomplete-input').addEventListener('input', function() {
        const input = this.value;
        const suggestionBox = document.getElementById('autocomplete-suggestions');
        suggestionBox.innerHTML = '';
        currentIndex = -1;

        const words = input.split(' ');
        const lastWord = words[words.length - 1];

        if (lastWord.length > 0 && lastWord != "*") {
            const filteredSuggestions = suggestions.filter(suggestion => 
                suggestion.toLowerCase().startsWith(lastWord.toLowerCase())
            );

            filteredSuggestions.forEach(suggestion => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.classList.add('autocomplete-suggestion');
                suggestionDiv.textContent = suggestion;
                suggestionDiv.addEventListener('click', function() {
                    words[words.length - 1] = suggestion + ":";
                    document.getElementById('autocomplete-input').value = words.join(' ');
                    suggestionBox.innerHTML = '';
                });
                suggestionBox.appendChild(suggestionDiv);
            });
        }
        else if (lastWord == "*") {
            suggestions.forEach(suggestion => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.classList.add('autocomplete-suggestion');
                suggestionDiv.textContent = suggestion;
                suggestionDiv.addEventListener('click', function() {
                    words[words.length - 1] = suggestion + ":";
                    document.getElementById('autocomplete-input').value = words.join(' ');
                    suggestionBox.innerHTML = '';
                });
                suggestionBox.appendChild(suggestionDiv);
            });
        }
    });

    document.getElementById('autocomplete-input').addEventListener('keydown', function(event) {
        const suggestionBox = document.getElementById('autocomplete-suggestions');
        const suggestionItems = suggestionBox.getElementsByClassName('autocomplete-suggestion');

        if (event.key === 'ArrowDown') {
            currentIndex++;
            if (currentIndex >= suggestionItems.length) {
                currentIndex = 0;
            }
            updateActiveSuggestion(suggestionItems);
        } else if (event.key === 'ArrowUp') {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = suggestionItems.length - 1;
            }
            updateActiveSuggestion(suggestionItems);
        } else if (event.key === 'Enter') {
            event.preventDefault(); // щоб не відправляти форму
            if (currentIndex >= 0 && currentIndex < suggestionItems.length) {
                const words = this.value.split(' ');
                words[words.length - 1] = suggestionItems[currentIndex].textContent + ':';
                this.value = words.join(' ');
                suggestionBox.innerHTML = '';
            }
        }
    });

    function updateActiveSuggestion(items) {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
        }
        if (currentIndex >= 0 && currentIndex < items.length) {
            items[currentIndex].classList.add('active');
            const words = document.getElementById('autocomplete-input').value.split(' ');
            words[words.length - 1] = items[currentIndex].textContent + ':';
            document.getElementById('autocomplete-input').value = words.join(' ');
        }
    }

    document.addEventListener('click', function(event) {
        if (!event.target.closest('#autocomplete-input') && 
            !event.target.closest('#autocomplete-suggestions')) {
            document.getElementById('autocomplete-suggestions').innerHTML = '';
        }
    });

    function processQuery() {
        const googleCheckbox = document.getElementById('google-checkbox');
        const bingCheckbox = document.getElementById('bing-checkbox');

        let userInput = document.getElementById('autocomplete-input').value;

        if (googleCheckbox.checked && bingCheckbox.checked) {
            window.open('https://www.google.com/search?q=' + userInput, '_blank');
            window.open('https://www.bing.com/search?q=' + userInput, '_blank');
        } else if (googleCheckbox.checked) {
            window.open('https://www.google.com/search?q=' + userInput, '_blank');
        } else if (bingCheckbox.checked) {
            window.open('https://www.bing.com/search?q=' + userInput, '_blank');
        } else {
            alert('Помилка: Жоден пошуковик не був обраний!');
        }
    }
