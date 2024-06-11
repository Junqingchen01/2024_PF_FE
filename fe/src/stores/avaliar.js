import {defineStore} from 'pinia';

export const useAvaliarStore = defineStore('avaliar',{
    state: () => ({
        avaliacoes: [],
        avaliacao: [],
        avaliacaoId: [],
    }),
    getters: {
        getAvaliacoes: (state) => state.avaliacoes,
        getAvaliacao: (state) => state.avaliacao,
        getAvaliacaoId: (state) => state.avaliacaoId,
    },
    actions:{
        async fetchAll(){
            try{
                const token = sessionStorage.getItem('token');
                const res = await fetch('http://localhost:8080/avaliacao/list',{
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if(res.status === 200){
                    const data = await res.json();
                    this.avaliacoes = data;
                    // sessionStorage.setItem('Allavaliacoes', JSON.stringify(data));
                    return true;
                }else{
                    return false;
                }
            }catch(error){
                console.error('Error getting avaliacoes:', error);
                return false;
            }
        },

        async fetchMyAvaliacoes(){
            try{
                const token = sessionStorage.getItem('token');
                const res = await fetch('http://localhost:8080/avaliacao/MyList',{
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if(res.status === 200){
                    const data = await res.json();
                    this.avaliacoes = data;
                    sessionStorage.setItem('Myavaliacoes', JSON.stringify(data));
                    return true;
                }else{
                    return false;
                }
            }catch(error){
                console.error('Error getting avaliacoes:', error);
                return false;
            }
        },
        async fetchAvaliacaoByid(id) {
            try {
                const token = sessionStorage.getItem('token');
                const res = await fetch(`http://localhost:8080/avaliacao/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.status === 200) {
                    const data = await res.json();
                    this.avaliacaoId = data;
                    sessionStorage.setItem('thisAvaliacao', JSON.stringify(this.avaliacaoId));
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error getting menu:', error);
                return false;
            }
        }
        
    }
})