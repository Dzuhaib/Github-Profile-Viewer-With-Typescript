var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// DOM Elements
var usernameInput = document.getElementById('username');
var searchBtn = document.getElementById('searchBtn');
var profileDiv = document.getElementById('profile');
var repoList = document.getElementById('repos');
// Event listener for search button
searchBtn.addEventListener('click', function () {
    var username = usernameInput.value.trim();
    if (username) {
        getUser(username);
        getRepos(username);
    }
    else {
        alert("Please enter a Github username");
    }
});
// Function to fetch Github user data
function getUser(username) {
    return __awaiter(this, void 0, void 0, function () {
        var response, userData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch("https://api.githup.com/users/".concat(username))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    userData = _a.sent();
                    displayUser(userData);
                    return [3 /*break*/, 4];
                case 3: throw new Error('User not found');
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error("Error fetching user data:", error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Function to fetch Github user repositories
function getRepos(username) {
    return __awaiter(this, void 0, void 0, function () {
        var response, reposData, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch("https://api.github.com/users/".concat(username, "/repos"))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    reposData = _a.sent();
                    displayRepos(reposData);
                    return [3 /*break*/, 4];
                case 3: throw new Error('Repositories not found');
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.log('Error fetching repositories:', error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Function to diplay user information
function displayUser(user) {
    profileDiv.innerHTML = "\n    <div>\n        <h2>".concat(user.login, "</h2>\n        <img src=\"").concat(user.avatar_url, "\" alt=\"Profile Picture\" style=\"width: 100px; hieght: 100px; border-radiud: 50%\">\n        <p>Followers: ").concat(user.followers, "</p>\n        <p>Following: ").concat(user.following, "</p>\n        <p>Bio: ").concat(user.bio ? user.bio : 'Not available', "</p>\n        <a href=\"").concat(user.html_url, "\" target=\"_blank\" class=\"btn\">View Profile</a>\n    </div>\n    ");
}
// Function to display user repositories
function displayRepos(repos) {
    repoList.innerHTML = repos
        .map(function (repo) { return "\n        <li>\n            <h3><a href=\"".concat(repo.html_url, "\" target=\"_blank\" ").concat(repo.name, "</a></h3>\n            <p>").concat(repo.name ? repo.name : 'No name found', " </p> \n            \n        </li>\n        "); })
        .join('');
}
