/* A classe usuario contara com campos como login, o tipo (consultar User_type),
  a senha a ser atrelada ao usuario, seu ranking geral e seus pontos */


public class User{
  public string  login;
  public User_type tipo_usuario = new User_type();
  public string  senha;
  public int  ranking;
  public int  pontos;
}