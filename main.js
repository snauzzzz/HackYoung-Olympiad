document.addEventListener('DOMContentLoaded', () => {
    alert('Welcome! Click anywhere on the page to discover a surprise!');
    const apiKey = '2f89654e869ea1daec003d4f15739a404dbe82b3'; 
    const cities = ['New York', 'London', 'Tokyo', 'Beijing', 'Paris', 'Los Angeles', 'Berlin', 'Moscow', 'Seoul', 'Sydney'];
    const airQualityData = [];

    const fetchAQIData = async () => {
        try {
            for (const city of cities) {
                const response = await fetch(`https://api.waqi.info/feed/${city}/?token=${apiKey}`);
                const data = await response.json();

                if (data.status === 'ok') {
                    airQualityData.push({ city: city, aqi: data.data.aqi });
                } else {
                    console.error(`Error fetching data for ${city}: ${data.data}`);
                }
            }
            renderChart();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const renderChart = () => {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: airQualityData.map(item => item.city),
                datasets: [{
                    label: 'AQI',
                    data: airQualityData.map(item => item.aqi),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    fetchAQIData();
});

document.addEventListener('click', function(event) {
    // Check if the click is on the body or main content area
    if (event.target === event.currentTarget  || event.target.closest('main')) {
        const images = ['leaf1.svg', 'leaf2.svg', 'leaf3.svg', 'leaf4.svg', 'leaf5.svg']; 
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImage = images[randomIndex]; 
        const leaf = document.createElement('img');
        leaf.src = 'leafs/' + randomImage; 
        leaf.className = 'leaf falling'; // Added 'falling' class
        // Adjust the position to account for the scroll position
        leaf.style.top = `${event.clientY + window.scrollY - 25}px`;
        leaf.style.left = `${event.clientX + window.scrollX - 25}px`;
        document.body.appendChild(leaf);

        // Add fade-out effect after a delay
        setTimeout(() => {
            leaf.style.opacity = '0';
            leaf.style.transition = 'opacity 3s ease-out'; 
            setTimeout(() => {
                leaf.remove(); 
            }, 3000); 
        }, 0); 
    }
});

// Fade in effect
document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.fade-in-on-scroll');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
});

