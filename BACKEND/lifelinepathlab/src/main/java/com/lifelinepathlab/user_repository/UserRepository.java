package com.lifelinepathlab.user_repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lifelinepathlab.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
