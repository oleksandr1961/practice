const blogDataUrl = 'data/posts.json';

document.addEventListener('DOMContentLoaded', () => {
    fetch(blogDataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            if (!Array.isArray(posts) || posts.length === 0) {
                throw new Error("JSON data is empty or invalid");
            }
            setupPagination(posts);
            setupSearch(posts);
            setupSorting(posts);
            renderCategories(posts);
        })
        .catch(error => console.error('Error loading blog data:', error));
});

function renderPosts(posts) {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="post-image">
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <h2>${post.title}</h2>
                <p class="post-date">${new Date(post.date).toLocaleDateString()}</p>
                <p class="post-excerpt">${post.content.substring(0, 100)}...</p>
                <a href="post.html?id=${post.id}" class="read-more">Read more</a>
            </div>
        `;
        postContainer.appendChild(postElement);
    });
}

function setupSearch(posts) {
    document.getElementById('search').addEventListener('input', () => {
        const query = document.getElementById('search').value.toLowerCase();
        const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query));
        renderPosts(filteredPosts);
    });
}

function setupSorting(posts) {
    document.getElementById('sort-date').addEventListener('click', () => {
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        renderPosts(posts);
    });
    document.getElementById('sort-name').addEventListener('click', () => {
        posts.sort((a, b) => a.title.localeCompare(b.title));
        renderPosts(posts);
    });
}

function setupPagination(posts) {
    const itemsPerPage = 8;
    let currentPage = 1;
    function paginate() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        renderPosts(posts.slice(start, end));
    }
    document.getElementById('next').addEventListener('click', () => {
        if (currentPage * itemsPerPage < posts.length) {
            currentPage++;
            paginate();
        }
    });
    document.getElementById('prev').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            paginate();
        }
    });
    paginate();
}

function renderCategories(posts) {
    const categories = [...new Set(posts.map(post => post.category))];
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = '';
    categories.forEach(category => {
        const categoryElement = document.createElement('button');
        categoryElement.className = 'category-filter';
        categoryElement.textContent = category;
        categoryElement.addEventListener('click', () => {
            const filteredPosts = posts.filter(post => post.category === category);
            renderPosts(filteredPosts);
        });
        categoryContainer.appendChild(categoryElement);
    });
}
