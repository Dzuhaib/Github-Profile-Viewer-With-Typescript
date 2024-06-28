// Intercafe github user
interface User {
    login: string;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
    following: number;
    bio: string
}

interface Repository {
    name: string;
    html_url: string;
    description: string
}

// DOM Elements
const usernameInput = document.getElementById('username') as HTMLInputElement
const searchBtn = document.getElementById('searchBtn') as HTMLInputElement
const profileDiv = document.getElementById('profile')!;
const repoList = document.getElementById('repos')!;

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();

    if(username) {
        getUser(username);
        getRepos(username)
    } else {
        alert("Please enter a Github username")
    }
});

// Function to fetch Github user data
async function getUser(username: string) {
    try {
        const response = await fetch(`https://api.githup.com/users/${username}`);
        if (response.ok) {
            const userData: User = await response.json();
            displayUser(userData);
        } else {
            throw new Error('User not found');
            
        } 
    } catch (error) {
        console.error(`Error fetching user data:`, error);
        // alert(`user not found, Please check the username and try again.`)
    }
}

// Function to fetch Github user repositories
async function getRepos(username: string) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (response.ok) {
            const reposData: Repository[] = await response.json();
            displayRepos(reposData)
        } else {
            throw new Error('Repositories not found');
        }
    } catch (error) {
        console.log('Error fetching repositories:', error);
        // alert('Repositories not found for the user')
    }
}

// Function to diplay user information
function displayUser(user: User) {
    profileDiv.innerHTML= `
    <div>
        <h2>${user.login}</h2>
        <img src="${user.avatar_url}" alt="Profile Picture" style="width: 100px; hieght: 100px; border-radiud: 50%">
        <p>Followers: ${user.followers}</p>
        <p>Following: ${user.following}</p>
        <p>Bio: ${user.bio ? user.bio : 'Not available'}</p>
        <a href="${user.html_url}" target="_blank" class="btn">View Profile</a>
    </div>
    `;
}

// Function to display user repositories
function displayRepos(repos: Repository[]) {
    repoList.innerHTML = repos
    .map(repo => `
        <li>
            <h3><a href="${repo.html_url}" target="_blank" ${repo.name}</a></h3>
            <p>${repo.name ? repo.name : 'No name found'} </p> 
            
        </li>
        `)
        .join('');
}