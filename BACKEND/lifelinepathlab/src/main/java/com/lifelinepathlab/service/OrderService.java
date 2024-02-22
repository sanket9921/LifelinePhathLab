package com.lifelinepathlab.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lifelinepathlab.exception.ResourceNotFoundException;
import com.lifelinepathlab.model.Orders;
import com.lifelinepathlab.model.Test;
import com.lifelinepathlab.model.User;
import com.lifelinepathlab.repository.OrderRepository;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository orderRepository;
	
	public void addorder(Orders orders) {
		orders.setDate(new Date());
		orders.setStatus("AC");
		orderRepository.save(orders);
	}
	
	public List<Orders> getAllOrders(){
		return orderRepository.findAll();
	}
	
//	  public List<Test> getAllTestsByUserId(int userId) {
//		  
//	        List<Orders> userOrders = orderRepository.findByUserId(userId , "AC");
//
//	        // Extracting all tests from user orders
//	        return userOrders.stream()
//	                .flatMap(order -> order.getTests().stream())
//	                .collect(Collectors.toList());
//	    }
	
	  public List<Orders> getAllTestsByUserId(int userId) {
	  
      List<Orders> userOrders = orderRepository.findByUserId(userId , "AC");
      return userOrders;
  }
	
	
	public Orders getOrdersByid(int id) {
		return orderRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Order does not exits with Order Id: ", id));

	}
	
	public void updateOrder(Orders orders, int id) {
		Orders orders2 = getOrdersByid(id);
		orders2.setStatus(orders.getStatus());
		orders2.setTests(orders.getTests());
		orderRepository.save(orders2);
	}

	public void deleteOrder(int id) {
		Orders orders = getOrdersByid(id);
		orderRepository.delete(orders);
	}
}
