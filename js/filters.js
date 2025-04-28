document.addEventListener('DOMContentLoaded', function() {
    const filtrosForm = document.getElementById('filtrosForm');
    const pacotesContainer = document.querySelector('.pacotes-container');
    const ordenacaoSelect = document.getElementById('ordenacao');
    
    if (filtrosForm && pacotesContainer) {
        const pacotes = pacotesContainer.querySelectorAll('.pacote-card');
        
        filtrosForm.addEventListener('submit', function(e) {
            e.preventDefault();
            filtrarPacotes(pacotes);
        });
        
        filtrosForm.addEventListener('reset', function() {
            setTimeout(() => filtrarPacotes(pacotes), 0);
        });
        
        // Adiciona eventos para filtros em tempo real
        const filtros = filtrosForm.querySelectorAll('select, input');
        filtros.forEach(filtro => {
            filtro.addEventListener('change', () => filtrarPacotes(pacotes));
        });
        
        // Inicializa os filtros
        filtrarPacotes(pacotes);
    }
    
    if (ordenacaoSelect && pacotesContainer) {
        ordenacaoSelect.addEventListener('change', () => ordenarPacotes(pacotesContainer));
    }
});

function filtrarPacotes(pacotes) {
    const tipo = document.getElementById('tipo')?.value || 'todos';
    const destino = document.getElementById('destino')?.value || 'todos';
    const duracao = document.getElementById('duracao')?.value || 'todos';
    const preco = document.getElementById('preco')?.value || 'todos';
    
    pacotes.forEach(pacote => {
        const matches = [
            tipo === 'todos' || pacote.classList.contains(tipo),
            destino === 'todos' || pacote.dataset.destino === destino,
            duracao === 'todos' || pacote.dataset.duracao === duracao,
            preco === 'todos' || pacote.dataset.preco === preco,
        ];
        
        pacote.style.display = matches.every(Boolean) ? 'block' : 'none';
    });
}

function ordenarPacotes(container) {
    const pacotes = Array.from(container.querySelectorAll('.pacote-card'));
    const ordem = document.getElementById('ordenacao')?.value;
    
    if (!ordem) return;
    
    pacotes.sort((a, b) => {
        const getPreco = el => {
            const precoEl = el.querySelector('.preco');
            return precoEl ? parseFloat(precoEl.textContent.replace(/[^\d,]/g, '').replace(',', '.')) : 0;
        };
        
        const getDuracao = el => {
            const duracaoEl = el.querySelector('.duracao');
            return duracaoEl ? parseInt(duracaoEl.textContent) : 0;
        };
        
        switch (ordem) {
            case 'preco-asc': return getPreco(a) - getPreco(b);
            case 'preco-desc': return getPreco(b) - getPreco(a);
            case 'duracao-asc': return getDuracao(a) - getDuracao(b);
            case 'duracao-desc': return getDuracao(b) - getDuracao(a);
            default: return 0;
        }
    });
    
    pacotes.forEach(pacote => container.appendChild(pacote));
}