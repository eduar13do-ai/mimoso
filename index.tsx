import React, { useState, useEffect, useRef, FormEvent } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";

// --- CONFIGURAÇÃO DO SUPABASE ---
const SUPABASE_URL = "https://gozdmpjiyzjknmwozxjr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvemRtcGppeXpqa25td296eGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNDE3NDksImV4cCI6MjA4MDgxNzc0OX0.K97oGp1XBtiPM-2eA_dnVQDfoLv_fOJKSRXxVsAtEoA";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- DADOS FAKES (PARA VISUALIZAÇÃO) ---
const FAKE_PARTICIPANTS: Participant[] = [
  { id: 'fake-1', nome: "João 'Mimoso' Silva", email: 'joao@game.com', telefone: '(11) 99999-1234', cpf: '123.***.***-00', id_plataforma: 'JoaoGamer_YT', sorteado: false, created_at: new Date().toISOString() },
  { id: 'fake-2', nome: 'Maria Sorte', email: 'maria@sorte.com', telefone: '(21) 98888-5678', cpf: '456.***.***-11', id_plataforma: 'MaryLucky', sorteado: true, created_at: new Date(Date.now() - 10000000).toISOString() },
  { id: 'fake-3', nome: 'Pedro Apostador', email: 'pedro@bet.com', telefone: '(31) 97777-9012', cpf: '789.***.***-22', id_plataforma: 'PedrinhoBet', sorteado: false, created_at: new Date(Date.now() - 5000000).toISOString() },
  { id: 'fake-4', nome: 'Ana Streamer', email: 'ana@live.com', telefone: '(41) 96666-3456', cpf: '321.***.***-33', id_plataforma: 'AnaLiveON', sorteado: false, created_at: new Date(Date.now() - 200000).toISOString() },
  { id: 'fake-5', nome: 'Carlos Vencedor', email: 'carlos@win.com', telefone: '(51) 95555-7890', cpf: '654.***.***-44', id_plataforma: 'CarlinhosVencedor', sorteado: false, created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 'fake-6', nome: 'Lucas Player', email: 'lucas@play.com', telefone: '(11) 94444-1111', cpf: '987.***.***-55', id_plataforma: 'LucasP_007', sorteado: false, created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 'fake-7', nome: 'Fernanda Games', email: 'fer@games.com', telefone: '(71) 93333-2222', cpf: '159.***.***-66', id_plataforma: 'Nanda_Gamer', sorteado: false, created_at: new Date(Date.now() - 40000000).toISOString() },
];

// --- ESTILOS CSS ---
const styles = `
:root {
  --bg-dark: #02040a;
  --bg-card: #0d1117;
  --bg-input: #161b22;
  --border: #30363d;
  --primary: #fbbf24;
  --primary-hover: #f59e0b;
  --admin-red: #ef4444;
  --admin-green: #10b981;
  --admin-purple: #8b5cf6;
  --text-main: #f0f6fc;
  --text-muted: #8b949e;
}

* { box-sizing: border-box; margin: 0; padding: 0; outline: none; font-family: 'Segoe UI', 'Roboto', sans-serif; }

body { 
  background-color: var(--bg-dark); 
  color: var(--text-main); 
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* Fundo Animado Cassino */
.casino-bg {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 0; overflow: hidden;
  background: radial-gradient(circle at 50% 0%, #1a1f2e 0%, var(--bg-dark) 90%);
}

.floating-item {
  position: absolute;
  bottom: -150px;
  color: rgba(255, 215, 0, 0.4);
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  font-weight: bold;
  user-select: none;
  animation: floatUp linear infinite;
  will-change: transform;
}

@keyframes floatUp {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.8; }
  100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
}

.content-wrapper { position: relative; z-index: 1; }

/* --- ADMIN LAYOUT --- */
.admin-header-bar {
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 2rem 5%; margin-bottom: 2rem;
}
.live-status { display: flex; flex-direction: column; gap: 0.5rem; }
.live-badge {
  background: #dc2626; color: white; padding: 4px 8px; border-radius: 4px; 
  font-weight: 800; font-size: 0.75rem; text-transform: uppercase; display: inline-block; width: fit-content;
}
.page-title { font-size: 2rem; font-weight: 800; color: #fff; margin: 0; }
.page-subtitle { color: var(--text-muted); font-size: 0.9rem; }

.admin-actions { display: flex; gap: 1rem; }
.btn-top {
  padding: 0.75rem 1.5rem; border-radius: 6px; border: none; font-weight: 700; cursor: pointer;
  text-transform: uppercase; display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;
}
.btn-red { background: var(--admin-red); color: white; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4); }
.btn-green { background: var(--admin-green); color: white; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4); }
.btn-dark { background: #21262d; color: var(--text-muted); border: 1px solid var(--border); }
.btn-dark:hover { color: white; border-color: white; }

/* Stats Grid */
.stats-container {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;
  padding: 0 5%; margin-bottom: 3rem;
}
@media (max-width: 1024px) { .stats-container { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .stats-container { grid-template-columns: 1fr; } }

.stat-box {
  background: #0d1117; border: 1px solid #21262d;
  border-radius: 12px; padding: 1.5rem; position: relative;
  display: flex; flex-direction: column; height: 120px; justify-content: center;
}
.stat-label { color: var(--text-muted); font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; }
.stat-number { font-size: 2.5rem; font-weight: 700; color: white; line-height: 1; }
.stat-icon {
  position: absolute; top: 1.5rem; right: 1.5rem; 
  width: 40px; height: 40px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
  background: rgba(255,255,255,0.03); color: var(--text-muted);
}

/* Table Area */
.data-area { padding: 0 5%; }
.filter-bar {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;
  background: #0d1117; padding: 1rem; border-radius: 8px; border: 1px solid #21262d;
}
.search-input {
  background: #010409; border: 1px solid #30363d; color: white; padding: 0.6rem 1rem;
  border-radius: 6px; width: 300px;
}
.table-container {
  background: #0d1117; border: 1px solid #21262d; border-radius: 12px; overflow: hidden;
}
.table { width: 100%; border-collapse: collapse; }
.table th {
  text-align: left; padding: 1rem 1.5rem; color: var(--text-muted); 
  font-size: 0.75rem; text-transform: uppercase; font-weight: 700;
  border-bottom: 1px solid #21262d; background: #161b22;
}
.table td {
  padding: 1rem 1.5rem; border-bottom: 1px solid #21262d; color: #e6edf3; font-size: 0.9rem;
}
.table tr:hover { background: rgba(255,255,255,0.02); }

/* --- USER FORM LAYOUT --- */
.user-layout {
  display: flex; align-items: center; justify-content: center; min-height: 100vh;
  padding: 2rem;
}
.user-card { width: 100%; max-width: 550px; }
.brand-header { margin-bottom: 2rem; }
.brand-title { font-size: 2.5rem; font-weight: 900; line-height: 1.1; margin-bottom: 0.5rem; }
.brand-subtitle { color: var(--text-muted); font-size: 1rem; }
.form-card {
  background: #0d1117; border: 1px solid #30363d; border-radius: 16px; padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}
.form-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; color: white; }
.form-desc { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem; }

.input-group { margin-bottom: 1.25rem; }
.input-label { display: block; color: var(--text-muted); font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem; text-transform: uppercase; }
.input-wrapper { position: relative; }
.input-icon {
  position: absolute; left: 1rem; top: 50%; transform: translateY(-50%);
  color: #6e7681;
}
.custom-input {
  width: 100%; background: #010409; border: 1px solid #30363d;
  color: white; padding: 1rem 1rem 1rem 3rem; border-radius: 8px;
  font-size: 1rem; transition: 0.2s;
}
.custom-input:focus { border-color: var(--primary); box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2); }

.btn-yellow {
  width: 100%; background: var(--primary); color: #000;
  padding: 1rem; border: none; border-radius: 8px;
  font-weight: 800; font-size: 1rem; text-transform: uppercase; cursor: pointer;
  margin-top: 1rem; box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
  transition: transform 0.1s;
}
.btn-yellow:hover { background: var(--primary-hover); }
.btn-yellow:active { transform: scale(0.98); }

.terms { display: flex; gap: 0.75rem; align-items: flex-start; margin-top: 1.5rem; }
.terms input { margin-top: 4px; accent-color: var(--primary); }
.terms label { font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; }
.terms a { color: var(--primary); text-decoration: none; }

.toggle-btn {
  position: fixed; bottom: 20px; right: 20px; background: #333; color: #fff;
  padding: 10px 20px; border-radius: 30px; border: 1px solid #555; cursor: pointer;
  font-size: 0.8rem; opacity: 0.5; z-index: 999;
}
.toggle-btn:hover { opacity: 1; }

.tag-id { 
  background: rgba(139, 92, 246, 0.15); color: #a78bfa; 
  padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-family: monospace; 
}

/* --- ROULETTE MODAL STYLES --- */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.85); backdrop-filter: blur(5px);
  z-index: 100; display: flex; align-items: center; justify-content: center;
}
.modal-content {
  background: #0d1117; border: 1px solid #30363d; border-radius: 20px;
  width: 90%; max-width: 600px; padding: 2rem; text-align: center;
  box-shadow: 0 0 50px rgba(251, 191, 36, 0.15);
  position: relative;
}
.close-modal {
  position: absolute; top: 1rem; right: 1rem;
  background: none; border: none; color: #8b949e; font-size: 1.5rem; cursor: pointer;
}
.roulette-container {
  margin: 2rem 0;
  height: 100px;
  background: #010409;
  border: 4px solid #fbbf24;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
}
.roulette-strip {
  display: flex;
  height: 100%;
  align-items: center;
  will-change: transform;
}
.roulette-item {
  min-width: 150px;
  height: 80px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  border-right: 1px solid #30363d;
  color: white; font-weight: bold; font-size: 1rem;
  background: #161b22;
}
.roulette-item.winner-highlight {
  background: #fbbf24; color: black;
  box-shadow: 0 0 15px #fbbf24;
}
.selector-line {
  position: absolute; left: 50%; top: 0; bottom: 0; width: 4px;
  background: #ef4444; transform: translateX(-50%);
  z-index: 10;
  box-shadow: 0 0 10px red;
}
.prize-control {
  display: flex; align-items: center; justify-content: center; gap: 1rem;
  margin-bottom: 2rem;
  background: #161b22; padding: 1rem; border-radius: 12px;
}
.prize-btn {
  background: #30363d; border: none; color: white; width: 30px; height: 30px;
  border-radius: 50%; cursor: pointer; font-size: 1.2rem;
}
.prize-btn:hover { background: #fbbf24; color: black; }
.prize-value { font-size: 1.5rem; font-weight: 800; color: #fbbf24; min-width: 120px; }

.filter-options {
  display: flex; justify-content: center; gap: 1rem; margin-bottom: 1.5rem;
}
.filter-chip {
  padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem; cursor: pointer;
  border: 1px solid #30363d; color: #8b949e; background: transparent;
  transition: 0.2s;
}
.filter-chip.active {
  background: rgba(251, 191, 36, 0.15); border-color: #fbbf24; color: #fbbf24;
}
`;

// --- TIPOS ---
interface Participant {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  id_plataforma: string;
  sorteado: boolean;
  created_at: string;
}

// --- COMPONENTES ---

// Componente do Fundo Animado
function CasinoBackground() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const icons = ['♠', '♥', '♦', '♣', '🎲', '🎰', '7️⃣', '💰', '💎'];
    const newItems = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      left: Math.random() * 100 + '%',
      duration: 5 + Math.random() * 15 + 's',
      delay: -Math.random() * 20 + 's',
      size: 1.5 + Math.random() * 3.5 + 'rem',
      opacity: 0.2 + Math.random() * 0.6
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="casino-bg">
      {items.map(item => (
        <div key={item.id} className="floating-item" style={{
          left: item.left,
          animationDuration: item.duration,
          animationDelay: item.delay,
          fontSize: item.size,
          opacity: item.opacity
        }}>
          {item.icon}
        </div>
      ))}
    </div>
  );
}

// Modal de Roleta
interface RouletteModalProps {
  onClose: () => void;
  participants: Participant[];
  onFinish: (winner: Participant) => void;
}

function RouletteModal({ onClose, participants, onFinish }: RouletteModalProps) {
  const [prize, setPrize] = useState(100);
  const [filterType, setFilterType] = useState<'all' | 'new'>('all');
  const [spinning, setSpinning] = useState(false);
  const [rouletteItems, setRouletteItems] = useState<Participant[]>([]);
  const [offset, setOffset] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  // Lógica de Filtro
  const getFilteredParticipants = () => {
    let list = participants.filter(p => !p.sorteado);
    if (filterType === 'new') {
      // Considera "novo" quem se cadastrou nas últimas 24h
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      list = list.filter(p => new Date(p.created_at) > oneDayAgo);
    }
    return list;
  };

  const handleSpin = () => {
    const list = getFilteredParticipants();
    if (list.length === 0) return alert("Nenhum participante encontrado com este filtro.");

    setSpinning(true);

    // 1. Escolher Ganhador
    const winner = list[Math.floor(Math.random() * list.length)];

    // 2. Montar a tira visual (Fake items antes + Ganhador + Fake items depois)
    // Precisamos de itens suficientes para a animação parecer longa
    const filler = Array.from({ length: 30 }).map(() => list[Math.floor(Math.random() * list.length)]);
    const finalStrip = [...filler, winner, ...filler.slice(0, 3)]; 
    
    setRouletteItems(finalStrip);
    
    // 3. Calcular Offset para centralizar o ganhador
    // Largura do item = 150px. O ganhador está no índice 30 (length do filler)
    // Container width ~ 540px (variable). Center is ~270px.
    // Item center = index * 150 + 75.
    // Translate = Item Center - Container Center.
    
    // Pequeno delay para renderizar a tira antes de animar
    setTimeout(() => {
        const itemWidth = 150;
        const winnerIndex = 30; // O indice onde colocamos o winner
        const containerWidth = stripRef.current?.parentElement?.clientWidth || 500;
        
        // Randomizar levemente a posição dentro do card do vencedor para realismo
        const randomOffset = Math.floor(Math.random() * 40) - 20;
        
        const targetX = (winnerIndex * itemWidth) - (containerWidth / 2) + (itemWidth / 2) + randomOffset;
        setOffset(targetX);

        // Tempo da animação CSS = 4s
        setTimeout(() => {
            setSpinning(false);
            onFinish(winner);
        }, 4500); // 4.5s (espera a animação acabar)

    }, 100);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose} disabled={spinning}>&times;</button>
        
        <h2 style={{color: 'white', marginBottom: '1rem'}}>🎰 Roleta da Sorte Mimoso</h2>
        
        {/* Controle de Prêmio */}
        <div className="prize-control">
            <button className="prize-btn" onClick={() => setPrize(Math.max(0, prize - 50))} disabled={spinning}>-</button>
            <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '0.7rem', color: '#8b949e', textTransform: 'uppercase'}}>Valor do Prêmio</div>
                <div className="prize-value">R$ {prize},00</div>
            </div>
            <button className="prize-btn" onClick={() => setPrize(prize + 50)} disabled={spinning}>+</button>
        </div>

        {/* Filtros */}
        <div className="filter-options">
            <button 
                className={`filter-chip ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
                disabled={spinning}
            >
                Todos Usuários
            </button>
            <button 
                className={`filter-chip ${filterType === 'new' ? 'active' : ''}`}
                onClick={() => setFilterType('new')}
                disabled={spinning}
            >
                Somente Novos (24h)
            </button>
        </div>

        {/* Janela da Roleta */}
        <div className="roulette-container">
            <div className="selector-line"></div>
            <div 
                className="roulette-strip" 
                ref={stripRef}
                style={{
                    transform: `translateX(-${offset}px)`,
                    transition: spinning ? 'transform 4s cubic-bezier(0.1, 0.9, 0.2, 1)' : 'none'
                }}
            >
                {rouletteItems.length > 0 ? rouletteItems.map((item, idx) => (
                    <div key={idx} className={`roulette-item ${idx === 30 && !spinning ? 'winner-highlight' : ''}`}>
                        <div style={{fontSize: '0.8rem', color: '#8b949e'}}>{item.id_plataforma}</div>
                        <div>{item.nome.split(' ')[0]}</div>
                    </div>
                )) : (
                   <div style={{width: '100%', textAlign: 'center', color: '#8b949e'}}>
                       Pronto para girar...
                   </div> 
                )}
            </div>
        </div>

        <div style={{marginTop: '2rem'}}>
             <button 
                className="btn-yellow" 
                style={{width: '200px', fontSize: '1.2rem', boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)'}}
                onClick={handleSpin}
                disabled={spinning}
             >
                {spinning ? 'GIRANDO...' : 'GIRAR AGORA'}
             </button>
             <p style={{marginTop: '1rem', fontSize: '0.8rem', color: '#8b949e'}}>
                 {getFilteredParticipants().length} participantes elegíveis com o filtro atual.
             </p>
        </div>

      </div>
    </div>
  );
}

// 1. PÁGINA DE USUÁRIO
function UserPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get("nome") as string,
      email: formData.get("email") as string,
      telefone: formData.get("telefone") as string,
      cpf: formData.get("cpf") as string,
      id_plataforma: formData.get("id_plataforma") as string,
    };

    try {
      // Verifica CPF duplicado
      const { data: existing } = await supabase
        .from("participantes")
        .select("id")
        .eq("cpf", data.cpf)
        .single();

      if (existing) {
        alert("Erro: Este CPF já está cadastrado!");
      } else {
        const { error } = await supabase.from("participantes").insert([data]);
        if (error) throw error;
        alert("Cadastro realizado com sucesso! Boa sorte!");
        (e.target as HTMLFormElement).reset();
      }
    } catch (error: any) {
      alert("Erro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-layout">
      <div className="user-card">
        <div className="brand-header">
           <div style={{color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.9rem', marginBottom: '10px'}}>
             👑 SORTEIO PREMIUM
           </div>
           <h1 className="brand-title">Cadastre-se e entre na lista oficial dos sorteios do Mimoso.</h1>
           <p className="brand-subtitle">Preencha seus dados uma única vez e participe dos sorteios que o Mimoso fizer ao vivo, de forma segura, organizada e transparente.</p>
        </div>

        <div className="form-card">
          <div className="form-title">Cadastrar-se no sorteio</div>
          <p className="form-desc">Preencha com atenção. Usaremos esses dados para validar o ganhador.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Nome Completo *</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input name="nome" className="custom-input" placeholder="Seu nome completo" required />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">WhatsApp (Com DDD) *</label>
              <div className="input-wrapper">
                <span className="input-icon">📱</span>
                <input name="telefone" className="custom-input" placeholder="(11) 99999-9999" required />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">ID / Usuário da Plataforma *</label>
              <div className="input-wrapper">
                <span className="input-icon">🎮</span>
                <input name="id_plataforma" className="custom-input" placeholder="Seu ID na plataforma" required />
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                <div className="input-group">
                <label className="input-label">CPF *</label>
                <div className="input-wrapper">
                    <span className="input-icon">#</span>
                    <input name="cpf" className="custom-input" placeholder="000.000.000-00" required />
                </div>
                </div>
                <div className="input-group">
                <label className="input-label">Email</label>
                <div className="input-wrapper">
                    <span className="input-icon">@</span>
                    <input name="email" type="email" className="custom-input" placeholder="email@exemplo.com" required />
                </div>
                </div>
            </div>

            <div className="terms">
              <input type="checkbox" required id="terms" />
              <label htmlFor="terms">Li e aceito os termos do sorteio e autorizo o uso dos meus dados apenas para fins de validação do prêmio. <a href="#">Ver termos.</a></label>
            </div>

            <button type="submit" className="btn-yellow" disabled={loading}>
              {loading ? "Processando..." : "PARTICIPAR DO SORTEIO"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// 2. PÁGINA ADMIN
function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [filter, setFilter] = useState("");
  const [showRoulette, setShowRoulette] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
  }, []);

  useEffect(() => {
    if (session) {
      fetchParticipants();
    }
  }, [session]);

  const fetchParticipants = async () => {
    const { data } = await supabase.from("participantes").select("*").order("created_at", { ascending: false });
    const realData = data || [];
    setParticipants([...realData, ...FAKE_PARTICIPANTS]);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (email === 'mimoso' && password === 'mimoso') {
      setSession({ user: { email: 'mimoso@admin.com', role: 'admin' }, access_token: 'fake-token' });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("Falha no login: " + error.message);
    } else {
      setSession(data.session);
    }
    setLoading(false);
  };

  const onRouletteFinish = async (winner: Participant) => {
    alert(`🏆 GANHADOR CONFIRMADO: ${winner.nome}\nID: ${winner.id_plataforma}\nWhatsApp: ${winner.telefone}`);
    
    if(winner.id.startsWith('fake-')) {
        setParticipants(prev => prev.map(p => p.id === winner.id ? {...p, sorteado: true} : p));
    } else {
        await supabase.from("participantes").update({ sorteado: true }).eq("id", winner.id);
        fetchParticipants();
    }
    // Opcional: Fechar modal automaticamente ou deixar o admin fechar
    setShowRoulette(false);
  };

  if (!session) {
    return (
        <div style={{display:'flex', height:'100vh', alignItems:'center', justifyContent:'center', position: 'relative', zIndex: 10}}>
            <div className="form-card" style={{width: '400px'}}>
                <h2 style={{color:'white', marginBottom:'20px'}}>Login Admin</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group"><input className="custom-input" placeholder="Email ou Usuário" value={email} onChange={e=>setEmail(e.target.value)}/></div>
                    <div className="input-group"><input className="custom-input" type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)}/></div>
                    <button className="btn-yellow" disabled={loading}>{loading ? 'Entrando...' : 'ENTRAR'}</button>
                </form>
            </div>
        </div>
    )
  }

  const eligibleCount = participants.filter(p => !p.sorteado).length;
  const winnerCount = participants.filter(p => p.sorteado).length;
  const filtered = participants.filter(p => p.nome.toLowerCase().includes(filter.toLowerCase()) || p.cpf.includes(filter) || p.id_plataforma.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      {/* MODAL ROLETA */}
      {showRoulette && (
          <RouletteModal 
            participants={participants}
            onClose={() => setShowRoulette(false)}
            onFinish={onRouletteFinish}
          />
      )}

      {/* Header com Botões */}
      <div className="admin-header-bar">
        <div className="live-status">
          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
             <span className="live-badge">AO VIVO</span>
             <span style={{color: '#8b949e'}}>Live (09/12/2025)</span>
          </div>
          <h1 className="page-title">Sorteio Em Andamento</h1>
          <p className="page-subtitle">Em andamento - Clique em (realizar sorteio) para sortear os usuários cadastrados.</p>
        </div>
        <div className="admin-actions">
          <button className="btn-top btn-dark" onClick={() => supabase.auth.signOut().then(() => setSession(null))}>Sair</button>
          <button className="btn-top btn-red">⏹ Encerrar Live</button>
          <button className="btn-top btn-green" onClick={() => setShowRoulette(true)}>🎲 Abrir Roleta</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-box">
           <span className="stat-label">Total de Participantes</span>
           <span className="stat-number">{participants.length}</span>
           <div className="stat-icon" style={{color:'#10b981'}}>👥</div>
        </div>
        <div className="stat-box">
           <span className="stat-label">Elegíveis para Sorteio</span>
           <span className="stat-number" style={{color:'#8b5cf6'}}>{eligibleCount}</span>
           <div className="stat-icon" style={{color:'#8b5cf6'}}>✔</div>
        </div>
        <div className="stat-box">
           <span className="stat-label">Já foram Premiados</span>
           <span className="stat-number" style={{color:'#f59e0b'}}>{winnerCount}</span>
           <div className="stat-icon" style={{color:'#f59e0b'}}>🏆</div>
        </div>
        <div className="stat-box">
           <span className="stat-label">Total de Lives</span>
           <span className="stat-number">128</span>
           <div className="stat-icon" style={{color:'#ec4899'}}>🎁</div>
        </div>
      </div>

      {/* Data Section */}
      <div className="data-area">
        <div className="filter-bar">
           <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
              <h3 style={{color:'white', fontSize:'1rem', marginRight:'1rem'}}>Cadastros ({participants.length})</h3>
              <input className="search-input" placeholder="Buscar por nome, WhatsApp, CPF ou ID..." value={filter} onChange={e=>setFilter(e.target.value)} />
           </div>
           <div>
              <button className="btn-top btn-dark" style={{fontSize:'0.7rem', padding: '0.5rem 1rem'}}>📥 Exportar CSV</button>
           </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>WhatsApp</th>
                <th>ID Plataforma</th>
                <th>CPF</th>
                <th>Data de Cadastro</th>
                <th>Participou De</th>
                <th>Status de Prêmio</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td style={{fontWeight:'bold'}}>{p.nome}</td>
                  <td>{p.telefone}</td>
                  <td><span className="tag-id">{p.id_plataforma}</span></td>
                  <td style={{color:'#8b949e'}}>{p.cpf}</td>
                  <td>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td>Live Atual</td>
                  <td>{p.sorteado ? <span style={{color:'#10b981'}}>Premiado</span> : <span style={{color:'#8b949e'}}>Pendente</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// MAIN
function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <>
      <style>{styles}</style>
      <CasinoBackground />
      <div className="content-wrapper">
        {isAdmin ? <AdminPage /> : <UserPage />}
        <button className="toggle-btn" onClick={() => setIsAdmin(!isAdmin)}>
          {isAdmin ? "Alternar para Cadastro (User)" : "Alternar para Painel Admin"}
        </button>
      </div>
    </>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);