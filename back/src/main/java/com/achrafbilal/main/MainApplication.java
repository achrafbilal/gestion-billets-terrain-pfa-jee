package com.achrafbilal.main;

import com.achrafbilal.main.DAO.SeatRepo;
import com.achrafbilal.main.DAO.TicketRepo;
import com.achrafbilal.main.DAO.UserRepo;
import com.achrafbilal.main.DAO.ZoneRepo;
import com.achrafbilal.main.Entities.Seat;
import com.achrafbilal.main.Entities.Ticket;
import com.achrafbilal.main.Entities.User;
import com.achrafbilal.main.Entities.Zone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

@SpringBootApplication
public class MainApplication implements ApplicationRunner {

	public static void main(String[] args) {
		SpringApplication.run(MainApplication.class, args);
		System.out.println("running");
	}

	@Autowired
	SeatRepo seatRepo;
	@Autowired
	ZoneRepo zoneRepo;
	@Autowired
	UserRepo userRepo;
	@Autowired
	TicketRepo ticketRepo;
	List<Zone> zones=new ArrayList<>();
	List<Seat> seats=new ArrayList<>();
	List<User> users=new ArrayList<>();
	List<Ticket> tickets=new ArrayList<>();
	Random random=new Random();
	@Override
	public void run(ApplicationArguments args)  {
		
		for(int i=0;i<10;i++) {
			Zone zone=new Zone();
			zone.setName("Zone "+(i+1));
			zone.setMaxSeat(100);
			zones.add(zone=zoneRepo.save(zone));
			for(int j=0;j<100;j++)
			{
				Seat seat=new Seat();
				seat.setSeatNumber(j + 1);
				seat.setZoneId(zone.getId());
				seats.add(seatRepo.save(seat));
			}
		}
		for (int i = 0; i < 10; i++) {
			User user=new User();
			user.setEmail(String.format("admin%d@mail.com",(i+1)));
			user.setFullName(String.format("Admin %d",(i+1)));
			user.setPassword("password");
			user.setRoleId(1);
			users.add(userRepo.save(user));
		}
		for (int i = 10; i < 30; i++) {
			User user=new User();
			user.setEmail(String.format("user%d@mail.com",(i+1)));
			user.setFullName(String.format("User %d",(i+1)));
			user.setPassword("password");
			user.setRoleId(2);
			users.add(userRepo.save(user));
		}
		for (int i = 0; i < 20; i++) {
			Ticket ticket=new Ticket();
			Calendar c=Calendar.getInstance();
			c.add(Calendar.DATE,-30);
			ticket.setPurchaseDate(c.getTime());
			c.add(Calendar.DATE,30);
			ticket.setReservationDate(c.getTime());
			ticket.setSeatId(seats.get(random.nextInt(seats.size()-1)).getId());
			ticket.setUserId(users.get(random.nextInt(users.size()-1)).getId());
			ticket.setPrice((double)random.nextInt(1500));
			tickets.add(ticketRepo.save(ticket));
		}


		System.out.println(String.format("%d zone created + %d seat created + %d user created + %d ticket created",zones.size(),seats.size(),users.size(),tickets.size()));
	}
}
