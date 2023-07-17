public	boolean	efetuar_login(User usuario, User vet_usuarios[]){
	int i;
	for(i=0 ; i <= MAX_SIZE ; i++)
		if(vet_usuarios[i].login = usuario.login) return true;
	
	return false;
}
		