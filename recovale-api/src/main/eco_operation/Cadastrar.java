/* Procura no array pelo login que foi passado como argumento, caso encontre ele retorna a mensagem de ja cadastrado, se nao um
 novo usuario com os parametros passados eh criado*/


public	void	cadastrar_usuario(User vet_usuarios[], String new_login, User_type new_type, String new_senha, int last_ranking){
	int	i = 0;
	while(((vet_usuarios[i].login) != NULL) || (vet_usuarios[i].login != new_login)) i++;
	if(vet_usuarios[i].login == NULL){
	vet_usuarios[i].login = new_login;
	vet_usuarios[i].User_type = new_type;
	vet_usuarios[i].senha = new_senha;
	vet_usuarios[i].ranking = last_ranking;
	vet_usuarios[i].pontos = 0;
}
	else printf("/n Usuario ja cadastrado /n");
}

	
	
	