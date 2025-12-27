package com.rabbiter.staff.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.rabbiter.staff.entity.Contract;
import com.baomidou.mybatisplus.extension.service.IService;
import com.rabbiter.staff.entity.vo.ContractQueryVo;

/**
 * <p>
 * 合同表 服务类
 * </p>
 *
 * @author
 * @since 2024-03-14
 */
public interface ContractService extends IService<Contract> {

    IPage<Contract> pageListQuery(Page<Contract> clerkPage, ContractQueryVo contractQueryVo);
}
