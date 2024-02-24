package com.lifelinepathlab.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
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
	@Autowired
	private TestService service;

	public void addOrder(Orders orders) {
		User user = orders.getUser();
		int userId = user.getUserId();
		double totalAmount=0;
		Orders existingOrder = orderRepository.findByUserId(userId, "AC");
		List<Test> tests = orders.getTests();
		
	
		
		if (existingOrder == null) {
			
			for(Test test : tests) {
				Test t2 = service.getTestById(test.getTestId()).get();
				totalAmount = t2.getFinalPrice();
			}
			orders.setDate(new Date());
			orders.setStatus("AC");
			orders.setTotalAmount(totalAmount);
			orderRepository.save(orders);
				
		} else {
			for(Test test: tests) {
				Test t = service.getTestById(test.getTestId()).get();
				System.out.println(existingOrder.getTotalAmount());

				totalAmount =existingOrder.getTotalAmount() +  t.getFinalPrice();
				System.out.println(totalAmount);
			}
			existingOrder.getTests().addAll(tests);
			existingOrder.setTotalAmount(totalAmount);
			orderRepository.save(existingOrder);
			
		}
		
		
			
	}

	public List<Orders> getAllOrders() {
		return orderRepository.findAll();
	}

	public List<Orders> getOrdersByStatus(String status) {
		return orderRepository.findByStatus(status);
	}

	public Orders getOrderByUserId(int userId) {

		Orders userOrders = orderRepository.findByUserId(userId, "AC");
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

	public void deleteTestFromOrder(int orderId, int testId) {
		Orders orders = getOrdersByid(orderId);
		List<Test> tests = orders.getTests();

		//System.out.println(tests);
				
		double finalprice =0;
		if (orders != null) {
			Test testToRemove = null;
			for (Test test : tests) {
				if (test.getTestId() == testId) {
					testToRemove = test;
					finalprice = test.getFinalPrice();
					break;
				}
			}
			

			if (testToRemove != null) {
				tests.remove(testToRemove);
				orders.setTotalAmount(orders.getTotalAmount() - finalprice);
				orderRepository.save(orders);
			}
			
			if (tests.isEmpty()) {
				orderRepository.delete(orders);
			}
		}
	}

}
