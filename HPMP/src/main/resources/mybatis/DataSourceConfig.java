package mybatis;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@MapperScan(value = "com.HPMP.domain.employee.mapper", annotationClass = org.apache.ibatis.annotations.Mapper.class, sqlSessionFactoryRef = "sqlSessionFactory")
public class DataSourceConfig {
	 private final ApplicationContext applicationContext;

	    @Bean
	    public SqlSessionFactory sqlSessionFactory (DataSource dataSource) throws Exception {
	        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();

	        sqlSessionFactoryBean.setDataSource(dataSource);
	        sqlSessionFactoryBean.setTypeAliasesPackage("com.HPMP.domain.employee.mapper");

	        return sqlSessionFactoryBean.getObject();
	    }

	    @Bean
	    public SqlSessionTemplate sqlSession (SqlSessionFactory sqlSessionFactory) {
	        return new SqlSessionTemplate(sqlSessionFactory);
	    }
	}
