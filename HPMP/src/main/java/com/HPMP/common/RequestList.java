package com.HPMP.common;

import org.springframework.data.domain.Pageable;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestList<T> {
	private T data;
	private Pageable pageable;
}
