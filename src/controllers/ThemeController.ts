// src/controllers/ThemeController.ts
export class ThemeController {
    private toggle: HTMLDivElement;
    private toggleCircle: HTMLDivElement;

    constructor() {
        this.initializeTheme();
        this.createToggle();
        this.bindEvents();
    }

    private initializeTheme(): void {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    private createToggle(): void {
        this.toggle = document.createElement('div');
        this.toggle.className = 'theme-toggle';
        
        this.toggleCircle = document.createElement('div');
        this.toggleCircle.className = 'theme-toggle-circle';
        
        this.toggle.appendChild(this.toggleCircle);
        document.body.appendChild(this.toggle);

        // Set initial state
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        this.toggle.setAttribute('data-theme', currentTheme);
    }

    private bindEvents(): void {
        this.toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            this.toggle.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                this.toggle.setAttribute('data-theme', newTheme);
            }
        });
    }
}