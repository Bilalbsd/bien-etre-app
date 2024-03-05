// Questions du sondage organisées par thème
const surveyData = {
    "Dépression": ["Vous sentez-vous souvent triste ou déprimé ces derniers temps?", "Avez-vous perdu de l'intérêt pour des activités qui vous plaisaient autrefois?"],
    "Anxiété": ["Êtes-vous souvent préoccupé par l'avenir et par des événements futurs?", "Ressentez-vous fréquemment une tension ou une nervosité sans raison apparente?"],
    // Ajoutez d'autres thèmes et questions selon votre besoin
  };
  
  // Générer les questions dans le DOM
  const questionsContainer = document.getElementById('questions');
  Object.keys(surveyData).forEach(theme => {
    const themeContainer = document.createElement('div');
    themeContainer.classList.add('mb-4');
  
    const themeTitle = document.createElement('h3');
    themeTitle.classList.add('text-lg', 'font-semibold', 'mb-2');
    themeTitle.innerText = theme;
    themeContainer.appendChild(themeTitle);
  
    surveyData[theme].forEach(question => {
      const questionElement = document.createElement('div');
      questionElement.classList.add('mb-2');
      questionElement.innerHTML = `<p>${question}</p>
        <div class="flex items-center">
          <span class="mr-2">Note :</span>
          <div id="${theme.replace(/\s+/g, '')}-${question.replace(/\s+/g, '')}" class="rating"></div>
        </div>`;
      themeContainer.appendChild(questionElement);
    });
  
    questionsContainer.appendChild(themeContainer);
  });
  
  // Fonction pour soumettre le sondage
  function submitSurvey() {
    // Collecte des réponses et calcule des résultats (non implémenté dans cet exemple)
  
    // Affichage des résultats
    document.getElementById('results').classList.remove('hidden');
      
    // Création d'un graphique (bar chart)
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(surveyData),
        datasets: [{
          label: 'Moyenne des notes par thème',
          data: [3, 4, 2], // Remplacez par les moyennes réelles
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
          },
        },
      },
    });
  
    // Création d'un camembert (pie chart)
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(surveyData),
        datasets: [{
          data: [10, 20], // Remplacez par les totaux réels
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        }],
      },
    });
  }
  
  // Initialiser les étoiles de notation (Rating)
  document.querySelectorAll('.rating').forEach(ratingContainer => {
    const rating = new StarRating({
      container: ratingContainer.id,
      maxStars: 5,
    });
  });
  
  function StarRating({ container, maxStars }) {
    this.container = document.getElementById(container);
    this.maxStars = maxStars;
  
    this.init = () => {
      for (let i = 1; i <= this.maxStars; i++) {
        const star = document.createElement('span');
        star.classList.add('cursor-pointer', 'text-xl', 'mr-1', 'hover:text-yellow-500');
        star.innerHTML = '★';
        star.dataset.value = i;
        star.addEventListener('click', this.handleStarClick);
        this.container.appendChild(star);
      }
    };
  
    this.handleStarClick = (event) => {
      const selectedValue = parseInt(event.target.dataset.value, 10);
      // Vous pouvez traiter la valeur sélectionnée ici (non implémenté dans cet exemple)
      console.log(`Thème: ${container}, Note: ${selectedValue}`);
  
      // Met à jour les étoiles pour montrer la note sélectionnée
      this.updateStars(selectedValue);
    };
  
    this.updateStars = (ratingValue) => {
      this.container.querySelectorAll('span').forEach((star, index) => {
        if (index < ratingValue) {
          star.innerHTML = '★';
          star.classList.add('text-yellow-500');
          star.classList.remove('text-gray-400');
        } else {
          star.innerHTML = '☆';
          star.classList.add('text-gray-400');
          star.classList.remove('text-yellow-500');
        }
      });
    };
  
    this.init();
  }
  
  // Utilisation de la classe StarRating
  const exampleRating = new StarRating({
    container: 'exampleContainer', // Remplacez par l'ID de votre conteneur
    maxStars: 5,
  });
  