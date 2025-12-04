package Empleado;

import java.util.*;
public class Uso_Empleado {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		/*
		Empleado empleado1=new Empleado("Paco", 85000, 1995, 12,17);
		
		Empleado empleado2=new Empleado("Ana", 95000, 1995,6,02);
		
		Empleado empleado3=new Empleado("María", 105000, 2002,3,15);
		
		empleado1.subeSueldo(5);
		empleado2.subeSueldo(5);
		empleado3.subeSueldo(5);
		
		System.out.println("Nombre :" + empleado1.getNombre() + "Sueldo: " + empleado1.getSueldo() + " Fecha de alta: " + empleado1.getFechaContrato());
		System.out.println("Nombre :" + empleado2.getNombre() + "Sueldo: " + empleado2.getSueldo() + " Fecha de alta: " + empleado2.getFechaContrato());
		System.out.println("Nombre :" + empleado3.getNombre() + "Sueldo: " + empleado3.getSueldo() + " Fecha de alta: " + empleado3.getFechaContrato());
		
		}	*/
		
		Jefatura jefe_RRHH=new Jefatura("Isi", 45000, 1992, 02, 27);
		jefe_RRHH.estableceIncentivo(2000);
		
		 Empleado[] misEmpleados=new Empleado[5];
		 
		 misEmpleados[0]=new Empleado("Paco", 85000, 1990,12,17);
		 misEmpleados[1]=new Empleado("Ana", 95000, 1995,06,02);
		 misEmpleados[2]=new Empleado("María", 105000, 2002,03,15);
		 misEmpleados[3]=new Empleado("Antonio",47500, 2009, 22, 9);
		 misEmpleados[4]= jefe_RRHH;
		
		for(Empleado e: misEmpleados) {
			e.subeSueldo(5);
		}
		
		for(Empleado e: misEmpleados) {
			
			System.out.println("nombre: " + e.getNombre()+ " Sueldo: " + e.getSueldo() + " Fecha de Alta: " + e.getFechaContrato());
		}
	}
}

class Empleado{
	
	public Empleado(String nom, double sue, int agno, int mes, int dia) {
		
		nombre=nom;
		sueldo=sue;
		GregorianCalendar calendario=new GregorianCalendar(agno, mes-1, dia);
		altaContrato=calendario.getTime();
		++IdSiguiente;
		Id=IdSiguiente; 
	}
	
	
	public Empleado(String nom) {
		nombre=nom;
	}
	
	
	public String getNombre() {//GETTER
		return nombre;
	}
	
	public double getSueldo() { //GETTER
		return sueldo;
	}
	
	public Date getFechaContrato() { //GETTER
		return altaContrato;
	}
	
	public void subeSueldo(double porcentaje) { //SETTER
		double aumento=sueldo*porcentaje/100;
		sueldo+=aumento;		
	}
	
	private String nombre;
	private double sueldo;
	private Date altaContrato;
	private static int IdSiguiente;
	private int Id;
	

}

	class Jefatura extends Empleado{
		
		public Jefatura(String nom, double sue, int agno, int mes, int dia) {
			
				super(nom, sue, agno, mes, dia);
		}		
	
		public void estableceIncentivo(double b) { //SETTER
			incentivo=b;
		}
		
		public double getSueldo() {
			double sueldoJefe=super.getSueldo();
			return sueldoJefe + incentivo;
		}
		
		private double incentivo;
}
	
	








