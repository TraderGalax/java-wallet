package com.wallet.repository

import com.wallet.entity.domain.BlockHeight
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QueryDslPredicateExecutor

interface BlockHeightRepository : JpaRepository<BlockHeight, Long>,
    QueryDslPredicateExecutor<BlockHeight>
