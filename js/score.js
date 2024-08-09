import { initSupabase } from './supabaseClient.js';

export class ScoreManager {
    constructor() {
        this.supabase = initSupabase();
        this.scoreElement = document.getElementById('score');
        this.leaderboardElement = document.getElementById('score-container');
        this.scoreBody = document.querySelector('#scoresTable tbody');
        this.playerName = null;
    }

    async initializePlayer() {
        this.playerName = prompt("Por favor, ingresa tu nombre:");
        if (!this.playerName) {
            this.playerName = "Anónimo";
        }
    }

    async updateScore(points) {
        if (!this.playerName) {
            await this.initializePlayer();
        }

        const { data, error } = await this.supabase
            .from('players')
            .insert([{ player_name: this.playerName, score: points }]);

        if (error) {
            console.error('Error al guardar la puntuación:', error);
        }
    }

    displayScore(points) {
        if (this.scoreElement) {
            this.scoreElement.textContent = `Puntuación: ${points}`;
        }
    }

    async fetchAndDisplayTopScores() {
        const { data, error } = await this.supabase
            .from('players')
            .select('*')
            .order('score', { ascending: false })
            .limit(10);

        if (error) {
            console.error('Error al obtener las puntuaciones:', error);
        } else {
            console.log(data);
            this.displayTopScores(data);
        }
    }

    displayTopScores(scores) {
        this.scoreBody.innerHTML = '';
        scores.forEach((score, index) => {
            const row = this.scoreBody.insertRow();
            row.insertCell(0).textContent = index + 1;
            row.insertCell(1).textContent = score.player_name;
            row.insertCell(2).textContent = score.score;
        });

        this.leaderboardElement.style.display = 'block';
    }
}
