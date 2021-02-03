#include "filter_options.h"
#include "options.h"


cSipMsgFilter::cSipMsgFilter(const char *filter) {
	setFilter(filter);
}

void cSipMsgFilter::setFilter(const char *filter) {
	JsonItem jsonData;
	jsonData.parse(filter);
	map<string, string> filterData;
	for(unsigned int i = 0; i < jsonData.getLocalCount(); i++) {
		JsonItem *item = jsonData.getLocalItem(i);
		string filterTypeName = item->getLocalName();
		string filterValue = item->getLocalValue();
		if(filterValue.empty()) {
			continue;
		}
		filterData[filterTypeName] = filterValue;
	}
	if(!filterData["type"].empty()) {
		vector<string> types = explode(filterData["type"], ',');
		if(types.size()) {
			cRecordFilterItem_numList *filter = new FILE_LINE(0) cRecordFilterItem_numList(this, smf_type);
			for(unsigned i = 0; i < types.size(); i++) {
				filter->addNum(atoi(types[i].c_str()));
			}
			addFilter(filter);
		}
	}
	if(!filterData["ip_src"].empty() &&
	   filterData["ip_src_dst_type"] == "0") {
		cRecordFilterItem_IP *filter1 =  new FILE_LINE(0) cRecordFilterItem_IP(this, smf_ip_src);
		filter1->addWhite(filterData["ip_src"].c_str());
		cRecordFilterItem_IP *filter2 = new FILE_LINE(0) cRecordFilterItem_IP(this, smf_ip_dst);
		filter2->addWhite(filterData["ip_src"].c_str());
		addFilter(filter1, filter2);
	} else {
		cRecordFilterItems gItems(cRecordFilterItems::_and);
		if(!filterData["ip_src"].empty()) {
			cRecordFilterItem_IP *filter = new FILE_LINE(0) cRecordFilterItem_IP(this, smf_ip_src);
			filter->addWhite(filterData["ip_src"].c_str());
			gItems.addFilter(filter);
		}
		if(!filterData["ip_dst"].empty()) {
			cRecordFilterItem_IP *filter = new FILE_LINE(0) cRecordFilterItem_IP(this, smf_ip_dst);
			filter->addWhite(filterData["ip_dst"].c_str());
			gItems.addFilter(filter);
		}
		if(gItems.isSet()) {
			addFilter(&gItems);
		}
	}
	if(!filterData["port_src"].empty() &&
	   filterData["port_src_dst_type"] == "0") {
		cRecordFilterItem_numList *filter1 =  new FILE_LINE(0) cRecordFilterItem_numList(this, smf_port_src);
		filter1->addNum(atoi(filterData["port_src"].c_str()));
		cRecordFilterItem_numList *filter2 = new FILE_LINE(0) cRecordFilterItem_numList(this, smf_port_dst);
		filter2->addNum(atoi(filterData["port_src"].c_str()));
		addFilter(filter1, filter2);
	} else {
		cRecordFilterItems gItems(cRecordFilterItems::_and);
		if(!filterData["port_src"].empty()) {
			cRecordFilterItem_numList *filter = new FILE_LINE(0) cRecordFilterItem_numList(this, smf_port_src);
			filter->addNum(atoi(filterData["port_src"].c_str()));
			gItems.addFilter(filter);
		}
		if(!filterData["port_dst"].empty()) {
			cRecordFilterItem_numList *filter = new FILE_LINE(0) cRecordFilterItem_numList(this, smf_port_dst);
			filter->addNum(atoi(filterData["port_dst"].c_str()));
			gItems.addFilter(filter);
		}
		if(gItems.isSet()) {
			addFilter(&gItems);
		}
	}
	if(!filterData["number_src"].empty() &&
	   filterData["number_src_dst_type"] == "0") {
		cRecordFilterItem_CheckString *filter1 = new FILE_LINE(0) cRecordFilterItem_CheckString(this, smf_number_src);
		filter1->addWhite(filterData["number_src"].c_str());
		cRecordFilterItem_CheckString *filter2 = new FILE_LINE(0) cRecordFilterItem_CheckString(this, smf_number_dst);
		filter2->addWhite(filterData["number_src"].c_str());
		addFilter(filter1, filter2);
	} else {
		cRecordFilterItems gItems(cRecordFilterItems::_and);
		if(!filterData["number_src"].empty()) {
			cRecordFilterItem_CheckString *filter = new FILE_LINE(0) cRecordFilterItem_CheckString(this, smf_number_src);
			filter->addWhite(filterData["number_src"].c_str());
			gItems.addFilter(filter);
		}
		if(!filterData["number_dst"].empty()) {
			cRecordFilterItem_CheckString *filter = new FILE_LINE(0) cRecordFilterItem_CheckString(this, smf_number_dst);
			filter->addWhite(filterData["number_dst"].c_str());
			gItems.addFilter(filter);
		}
		if(gItems.isSet()) {
			addFilter(&gItems);
		}
	}
	if(!filterData["domain_src"].empty() &&
	   filterData["domain_src_dst_type"] == "0") {
		cRecordFilterItem_CheckString *filter1 = new FILE_LINE(0) cRecordFilterItem_CheckString(this, smf_domain_src);
		filter1->addWhite(filterData["domain_src"].c_str());
		cRecordFilterItem_CheckString *filter2 = new FILE_LINE(0) cRecordFilterItem_CheckString(this, smf_domain_dst);
		filter2->addWhite(filterData["domain_src"].c_str());
		addFilter(filter1, filter2);
	} else {
		cRecordFilterItems gItems(cRecordFilterItems::_and);
		if(!filterData["domain_src"].empty()) {
			cRecordFilterItem_CheckString *filter = new FILE_LINE(0) cRecordFilterItem_CheckString(this, smf_domain_src);
			filter->addWhite(filterData["domain_src"].c_str());
			gItems.addFilter(filter);
		}
		if(!filterData["domain_dst"].empty()) {
			cRecordFilterItem_CheckString *filter = new FILE_LINE(0) cRecordFilterItem_CheckString(this, smf_domain_dst);
			filter->addWhite(filterData["domain_dst"].c_str());
			gItems.addFilter(filter);
		}
		if(gItems.isSet()) {
			addFilter(&gItems);
		}
	}
	if(!filterData["ua_src"].empty() &&
	   filterData["ua_src_dst_type"] == "0") {
		cRecordFilterItem_CheckString *filter1 = new FILE_LINE(0) cRecordFilterItem_CheckString(this, smf_ua_src);
		filter1->addWhite(filterData["ua_src"].c_str());
		cRecordFilterItem_CheckString *filter2 = new FILE_LINE(0) cRecordFilterItem_CheckString(this, smf_ua_dst);
		filter2->addWhite(filterData["ua_src"].c_str());
		addFilter(filter1, filter2);
	} else {
		cRecordFilterItems gItems(cRecordFilterItems::_and);
		if(!filterData["ua_src"].empty()) {
			cRecordFilterItem_CheckString *filter = new FILE_LINE(0) cRecordFilterItem_CheckString(this, smf_ua_src);
			filter->addWhite(filterData["ua_src"].c_str());
			gItems.addFilter(filter);
		}
		if(!filterData["ua_dst"].empty()) {
			cRecordFilterItem_CheckString *filter = new FILE_LINE(0) cRecordFilterItem_CheckString(this, smf_ua_dst);
			filter->addWhite(filterData["ua_dst"].c_str());
			gItems.addFilter(filter);
		}
		if(gItems.isSet()) {
			addFilter(&gItems);
		}
	}
	if(atoi(filterData["qualify_state"].c_str()) == 1) {
		cRecordFilterItem_numList *filter = new FILE_LINE(0) cRecordFilterItem_numList(this, smf_qualify_ok);
		filter->addNum(1);
		addFilter(filter);
	} else if(atoi(filterData["qualify_state"].c_str()) == 2) {
		cRecordFilterItem_numList *filter = new FILE_LINE(0) cRecordFilterItem_numList(this, smf_qualify_ok);
		filter->addNum(0);
		filter->addNum(-1);
		addFilter(filter);
	}
	if(!filterData["response_duration_ge"].empty()) {
		cRecordFilterItem_numInterval *filter = new FILE_LINE(0) cRecordFilterItem_numInterval(this, smf_response_duration_ms, atol(filterData["response_duration_ge"].c_str()), cRecordFilterItem_base::_ge);
		addFilter(filter);
	}
	if(!filterData["response_duration_lt"].empty()) {
		cRecordFilterItem_numInterval *filter1 = new FILE_LINE(0) cRecordFilterItem_numInterval(this, smf_response_duration_ms, atol(filterData["response_duration_lt"].c_str()), cRecordFilterItem_base::_lt);
		addFilter(filter1);
		cRecordFilterItem_numInterval *filter2 = new FILE_LINE(0) cRecordFilterItem_numInterval(this, smf_response_duration_ms, 0, cRecordFilterItem_base::_ge);
		addFilter(filter2);
	}
	if(!filterData["response_number"].empty()) {
		cRecordFilterItem_numList *filterNum = NULL;
		cRecordFilterItem_CheckString *filterStr = NULL;
		vector<string> response_numbers_str = split(filterData["response_number"].c_str(), split(",|;| ", "|"), true);
		bool onlyNums = true;
		for(unsigned i = 0; i < response_numbers_str.size(); i++) {
			if(!(string_is_numeric(response_numbers_str[i].c_str()) ||
			     (response_numbers_str[i][0] == '!' && string_is_numeric(response_numbers_str[i].c_str() + 1)))) {
				onlyNums = false;
				break;
			}
		}
		if(onlyNums) {
			for(unsigned i = 0; i < response_numbers_str.size(); i++) {
				if(string_is_numeric(response_numbers_str[i].c_str()) ||
				   (response_numbers_str[i][0] == '!' && string_is_numeric(response_numbers_str[i].c_str() + 1))) {
					bool _not = response_numbers_str[i][0] == '!';
					if(!filterNum) {
						filterNum = new FILE_LINE(0) cRecordFilterItem_numList(this, smf_response_number);
					}
					filterNum->addNum(atoi(response_numbers_str[i].c_str() + (_not ? 1 : 0)), _not);
				}
			}
		} else {
			response_numbers_str = split(filterData["response_number"].c_str(), split(",|;", "|"), true);
			for(unsigned i = 0; i < response_numbers_str.size(); i++) {
				if(string_is_numeric(response_numbers_str[i].c_str()) ||
				   (response_numbers_str[i][0] == '!' && string_is_numeric(response_numbers_str[i].c_str() + 1))) {
					bool _not = response_numbers_str[i][0] == '!';
					if(!filterNum) {
						filterNum = new FILE_LINE(0) cRecordFilterItem_numList(this, smf_response_number);
					}
					filterNum->addNum(atoi(response_numbers_str[i].c_str() + (_not ? 1 : 0)), _not);
				} else {
					bool _not = response_numbers_str[i][0] == '!';
					if(!filterStr) {
						filterStr = new FILE_LINE(0) cRecordFilterItem_CheckString(this, smf_response_string);
					}
					if(_not) {
						filterStr->addBlack(response_numbers_str[i].c_str() + 1);
					} else {
						filterStr->addWhite(response_numbers_str[i].c_str());
					}
				}
			}
		}
		if(filterNum && filterStr) {
			addFilter(filterNum, filterStr);
		} else {
			if(filterNum) {
				addFilter(filterNum);
			}
			if(filterStr) {
				addFilter(filterStr);
			}
		}
	}
	if(!filterData["sensor_id"].empty()) {
		cRecordFilterItem_numList *filter = new FILE_LINE(0) cRecordFilterItem_numList(this, smf_id_sensor);
		filter->addNum(atoi(filterData["sensor_id"].c_str()) >= 0 ? atoi(filterData["sensor_id"].c_str()) : -1);
		addFilter(filter);
	}
}
