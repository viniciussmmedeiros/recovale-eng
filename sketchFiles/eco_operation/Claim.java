public 	boolean	claim_reward(User usuario, recompensa* reward_claimed){
	
	if(reward_claimed.custo > usuario.pontos ) return  false;
	else{ if(reward_claimed.n_left > 0){
		reward_claimed.n_left--;
		return true;
	}
		  else return false;