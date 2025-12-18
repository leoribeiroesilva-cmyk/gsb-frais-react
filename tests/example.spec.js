// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/GSB Frais/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Connexion' }).click();

  // Expects page to have a heading with the name of Connexion.
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
});

test ('Connexion', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    // Remplir le formulaire de connexion
    await page.fill('input[name="login"]', 'Andre');
    await page.fill('input[name="password"]', 'secret');

    // Soumettre le formulaire
    await page.click('button[type="submit"]');

    // Vérifier la redirection vers le tableau de bord
    await expect (page).toHaveURL('http://localhost:3000/dashboard');
});

test ('identifiant incorrect', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    // Remplir le formulaire de connexion avec des identifiants incorrects
    await page.fill('input[name="login"]', 'WrongUser');
    await page.fill('input[name="password"]', 'WrongPassword');

    // Soumettre le formulaire
    await page.click('button[type="submit"]');

    // Vérifier la présence d'une alerte d'erreur
    page.on("dialog", async (dialog) => {
        expect(dialog.type()).toBe("alert");
        expect(dialog.message()).toBe("Login ou mot de passe incorrect");
        await dialog.dismiss();
      });
    // l'utilisateur reste sur la page de connexion
    await expect (page).toHaveURL('http://localhost:3000/login');
});

test ('rafraichir la page du dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    // Remplir le formulaire de connexion
    await page.fill('input[name="login"]', 'Andre');
    await page.fill('input[name="password"]', 'secret');

    // Soumettre le formulaire
    await page.click('button[type="submit"]');
    
    // Vérifier la redirection vers le tableau de bord
    await expect (page).toHaveURL('http://localhost:3000/dashboard');

    // Rafraîchir la page
    await page.reload();

    // Vérifier que l'utilisateur est toujours sur le tableau de bord
    await expect (page).toHaveURL('http://localhost:3000/dashboard');
});

test ('déconnexion', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    // Remplir le formulaire de connexion
    await page.fill('input[name="login"]', 'Andre');
    await page.fill('input[name="password"]', 'secret');

    // Soumettre le formulaire
    await page.click('button[type="submit"]');
    
    // Vérifier la redirection vers le tableau de bord
    await expect (page).toHaveURL('http://localhost:3000/dashboard');

    // Cliquer sur le bouton de déconnexion
    await page.getByRole('button', { name: 'Déconnexion' }).click();

    // Vérifier la redirection vers la page de connexion
    await expect (page).toHaveURL('http://localhost:3000/login');
});