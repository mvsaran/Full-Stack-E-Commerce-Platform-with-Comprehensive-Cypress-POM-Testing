# Contributing to E-Commerce Application

Thank you for your interest in contributing to this project! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Messages](#commit-messages)

---

## Code of Conduct

This project follows a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

---

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/ecommerce-app.git
   cd ecommerce-app
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/ecommerce-app.git
   ```

4. **Install dependencies** for all parts:
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd ../frontend && npm install
   
   # Cypress
   cd .. && npm install
   ```

5. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## Development Process

### Before You Start

1. Check existing [issues](https://github.com/ORIGINAL-OWNER/ecommerce-app/issues)
2. Create a new issue if your feature/bug isn't listed
3. Wait for approval before starting major changes

### Making Changes

1. **Keep changes focused** - One feature or fix per PR
2. **Write tests** - Add tests for new features
3. **Update documentation** - Keep README and guides up-to-date
4. **Test thoroughly** - Run all tests before submitting

### Running Tests

```bash
# Run all tests
npm run cy:run

# Run specific test suite
npx cypress run --spec "cypress/e2e/login.spec.js"

# Run in interactive mode
npm run cy:open
```

---

## Pull Request Process

1. **Update your branch** with latest upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all tests** and ensure they pass
3. **Update documentation** if needed
4. **Create pull request** with a clear description:
   - What changes were made
   - Why they were made
   - How to test them

5. **Link related issues** using keywords (e.g., "Fixes #123")

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All existing tests pass
- [ ] New tests added
- [ ] Tested manually

## Screenshots (if applicable)
Add screenshots here
```

---

## Coding Standards

### JavaScript/React

- Use ES6+ syntax
- Follow functional component patterns
- Use meaningful variable names
- Add comments for complex logic

```javascript
// Good
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

// Bad
const calc = (x) => {
  return x.reduce((a, b) => a + b.p * b.q, 0)
}
```

### File Naming

- Components: `PascalCase.jsx` (e.g., `ProductCard.jsx`)
- Utilities: `camelCase.js` (e.g., `apiHelpers.js`)
- Tests: `*.spec.js` (e.g., `login.spec.js`)
- Page Objects: `PascalCase.js` (e.g., `LoginPage.js`)

### CSS/Styling

- Use Tailwind utility classes
- Follow mobile-first approach
- Keep custom CSS minimal

---

## Testing Guidelines

### Writing E2E Tests

```javascript
// Use Page Objects
import LoginPage from '../page-objects/LoginPage'

describe('Feature Name', () => {
  const loginPage = new LoginPage()
  
  it('should do something specific', () => {
    loginPage.visit()
    loginPage.login('email@example.com', 'password')
    // assertions
  })
})
```

### Writing API Tests

```javascript
describe('API Endpoint', () => {
  it('should return correct data', () => {
    cy.request('GET', '/api/endpoint')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('data')
      })
  })
})
```

### Test Coverage

- Write tests for happy paths
- Write tests for error cases
- Test edge cases and validations
- Aim for meaningful coverage, not just high percentages

---

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(products): add category filtering to product list

- Added dropdown for category selection
- Implemented filter logic in ProductsPage
- Added tests for filtering functionality

Closes #123
```

```bash
fix(checkout): correct total calculation for multiple items

The total was not updating correctly when items had
different quantities. Fixed the calculation logic.

Fixes #456
```

---

## Questions?

Feel free to:
- Open an issue for discussion
- Reach out to maintainers
- Ask in pull request comments

Thank you for contributing! 🙏
