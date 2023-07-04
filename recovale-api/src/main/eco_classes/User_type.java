// Essas definicoes devem constar na main
static final datatype  USUARIO_COMUM = 0;
static final datatype  USUARIO_REMETENTE = 1;
static final datatype  USUARIO_COLETOR = 2;
static final datatype  USUARIO_ADMIN = 3;

/* O tipo de usuario sera um atributo que designa a cada usuario, suas operacoes possiveis
  para facilitar na API vamos atribuir um codigo inteiro */
public class User_type{
  public String tipo_usuario;
  public int  codigo_tipo;
}