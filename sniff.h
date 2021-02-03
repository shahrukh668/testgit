/* Martin Vit support@voipmonitor.org
 * This program is free software, distributed under the terms of
 * the GNU General Public License Version 2.
*/

#ifndef SNIFF_H
#define SNIFF_H

#include <queue>
#include <map>
#include <semaphore.h>

#include "rqueue.h"
#include "voipmonitor.h"
#include "calltable.h"
#include "pcap_queue_block.h"
#include "fraud.h"
#include "tools.h"
#include "audiocodes.h"

#ifdef FREEBSD
#include <machine/endian.h>
#else
#include "asm/byteorder.h"
#endif

#define RTP_FIXED_HEADERLEN 12

#define MAX_LENGTH_CALL_INFO 20

void *rtp_read_thread_func(void *arg);
void add_rtp_read_thread();
void set_remove_rtp_read_thread();
int get_index_rtp_read_thread_min_size();
int get_index_rtp_read_thread_min_calls();
double get_rtp_sum_cpu_usage(double *max = NULL);
string get_rtp_threads_cpu_usage(bool callPstat);

#ifdef HAS_NIDS
void readdump_libnids(pcap_t *handle);
#endif
void readdump_libpcap(pcap_t *handle, u_int16_t handle_index);


typedef std::map<vmIP, vmIP> nat_aliases_t; //!< 


/* this is copied from libpcap sll.h header file, which is not included in debian distribution */
#define SLL_ADDRLEN       8               /* length of address field */
struct sll_header {
	u_int16_t sll_pkttype;          /* packet type */
	u_int16_t sll_hatype;           /* link-layer address type */
	u_int16_t sll_halen;            /* link-layer address length */
	u_int8_t sll_addr[SLL_ADDRLEN]; /* link-layer address */
	u_int16_t sll_protocol;         /* protocol */
};

#define IS_RTP(data, datalen) ((datalen) >= 2 && (htons(*(u_int16_t*)(data)) & 0xC000) == 0x8000)
#define IS_STUN(data, datalen) ((datalen) >= 2 && (htons(*(u_int16_t*)(data)) & 0xC000) == 0x0)
#define IS_DTLS(data, datalen) ((datalen) >= 2 && (htons(*(u_int16_t*)(data)) & 0xFF00) < 0x4000)

enum e_packet_s_type {
	_t_packet_s = 1,
	_t_packet_s_stack,
	_t_packet_s_plus_pointer,
	_t_packet_s_process_0,
	_t_packet_s_process
};

struct packet_s_kamailio_subst {
	vmIP saddr;
	vmIP daddr;
	vmPort source; 
	vmPort dest;
	timeval ts;
	bool is_tcp;
};

struct packet_s {
	u_int8_t __type;
	#if USE_PACKET_NUMBER
	u_int64_t packet_number;
	#endif
	vmIP _saddr;
	vmIP _daddr; 
	u_int32_t _datalen; 
	u_int32_t _datalen_set; 
	pcap_pkthdr *header_pt; 
	const u_char *packet; 
	pcap_block_store *block_store; 
	u_int32_t block_store_index; 
	vmIP sensor_ip;
	u_int16_t handle_index; 
	u_int16_t dlt; 
	u_int16_t sensor_id_u;
	vmPort _source; 
	vmPort _dest;
	u_int16_t _dataoffset;
	u_int16_t header_ip_offset;
	unsigned int istcp : 2;
	sPacketInfoData pid;
	bool isother: 1;
	bool is_ssl : 1;
	bool is_skinny : 1;
	bool is_mgcp: 1;
	bool is_need_sip_process : 1;
	bool _blockstore_lock : 1;
	bool _packet_alloc : 1;
	sAudiocodes *audiocodes;
	packet_s_kamailio_subst *kamailio_subst;
	inline vmIP saddr_() {
		if(audiocodes) {
			return(audiocodes->packet_source_ip);
		}
		if(kamailio_subst) {
			return(kamailio_subst->saddr);
		}
		return(_saddr);
	}
	inline vmIP daddr_() {
		if(audiocodes) {
			return(audiocodes->packet_dest_ip);
		}
		if(kamailio_subst) {
			return(kamailio_subst->daddr);
		}
		return(_daddr);
	}
	inline vmPort source_() {
		if(audiocodes) {
			return(audiocodes->packet_source_port);
		}
		if(kamailio_subst) {
			return(kamailio_subst->source);
		}
		return(_source);
	}
	inline vmPort dest_() {
		if(audiocodes) {
			return(audiocodes->packet_dest_port);
		}
		if(kamailio_subst) {
			return(kamailio_subst->dest);
		}
		return(_dest);
	}
	inline char *data_() {
		return((char*)(packet + dataoffset_()));
	}
	inline u_int32_t datalen_() {
		if(_datalen_set) {
			return(_datalen_set);
		}
		if(audiocodes) {
			return(_datalen - audiocodes->get_data_offset((u_char*)(packet + _dataoffset)));
		}
		return(_datalen);
	}
	inline void set_datalen_(u_int32_t datalen) {
		if(datalen != datalen_()) {
			_datalen_set = datalen;
		}
	}
	inline u_int32_t dataoffset_() {
		if(audiocodes) {
			return(_dataoffset + 
			       audiocodes->get_data_offset((u_char*)(packet + _dataoffset)));
		}
		return(_dataoffset);
	}
	inline iphdr2 *header_ip_() {
		return((iphdr2*)(packet + header_ip_offset));
	}
	inline udphdr2 *header_udp_() {
		iphdr2 *header_ip = header_ip_();
		return((udphdr2*)((char*)header_ip + header_ip->get_hdr_size()));
	}
	inline tcphdr2 *header_tcp_() {
		iphdr2 *header_ip = header_ip_();
		return((tcphdr2*)((char*)header_ip + header_ip->get_hdr_size()));
	}
	inline u_int32_t tcp_seq() {
		if(istcp) {
			tcphdr2 *header_tcp = header_tcp_();
			if(header_tcp) {
				return(header_tcp->seq);
			}
		}
		return(0);
	}
	inline int sensor_id_() {
		return(sensor_id_u == 0xFFFF ? -1 : sensor_id_u);
	}
	inline packet_s() {
		__type = _t_packet_s;
		init();
	}
	inline u_int64_t getTimeUS() {
		if(kamailio_subst && isSetTimeval(kamailio_subst->ts)) {
			return(::getTimeUS(kamailio_subst->ts));
		}
		return(::getTimeUS(header_pt->ts));
	}
	inline double getTimeSF() {
		if(kamailio_subst && isSetTimeval(kamailio_subst->ts)) {
			return(::getTimeSF(kamailio_subst->ts));
		}
		return(::getTimeSF(header_pt->ts));
	}
	inline timeval getTimeval() {
		if(kamailio_subst && isSetTimeval(kamailio_subst->ts)) {
			return(kamailio_subst->ts);
		}
		return(header_pt->ts);
	}
	inline timeval *getTimeval_pt() {
		if(kamailio_subst && isSetTimeval(kamailio_subst->ts)) {
			return(&kamailio_subst->ts);
		}
		return(&header_pt->ts);
	}
	inline u_int32_t getTime_s() {
		if(kamailio_subst && isSetTimeval(kamailio_subst->ts)) {
			return(kamailio_subst->ts.tv_sec);
		}
		return(header_pt->ts.tv_sec);
	}
	inline u_int32_t getTime_us() {
		if(kamailio_subst && isSetTimeval(kamailio_subst->ts)) {
			return(kamailio_subst->ts.tv_usec);
		}
		return(header_pt->ts.tv_usec);
	}
	inline void init() {
		_blockstore_lock = false;
		_packet_alloc = false;
		audiocodes = NULL;
		kamailio_subst = NULL;
	}
	inline void term() {
		if(audiocodes) {
			delete audiocodes;
			audiocodes = NULL;
		}
		if(kamailio_subst) {
			delete kamailio_subst;
			kamailio_subst = NULL;
		}
	}
	inline void blockstore_lock(int lock_flag) {
		if(!_blockstore_lock && block_store) {
			block_store->lock_packet(block_store_index, lock_flag);
			_blockstore_lock = true;
		}
	}
	inline void blockstore_forcelock(int lock_flag) {
		if(block_store) {
			block_store->lock_packet(block_store_index, lock_flag);
			_blockstore_lock = true;
		}
	}
	inline void blockstore_setlock() {
		if(block_store) {
			_blockstore_lock = true;
		}
	}
	inline void blockstore_relock(int lock_flag) {
		if(_blockstore_lock && block_store) {
			block_store->lock_packet(block_store_index, lock_flag);
		}
	}
	inline void blockstore_unlock() {
		if(_blockstore_lock && block_store && !is_terminating()) {
			block_store->unlock_packet(block_store_index);
			_blockstore_lock = false;
		}
	}
	inline void blockstore_forceunlock() {
		if(block_store && !is_terminating()) {
			block_store->unlock_packet(block_store_index);
		}
	}
	inline void blockstore_clear() {
		block_store = NULL; 
		block_store_index = 0; 
		_blockstore_lock = false;
	}
	inline void blockstore_addflag(int /*flag*/) {
		#if DEBUG_SYNC_PCAP_BLOCK_STORE
		if(_blockstore_lock && block_store) {
			block_store->add_flag(block_store_index, flag);
		}
		#endif
	}
	inline void packetdelete() {
		if(_packet_alloc) {
			delete header_pt;
			delete [] packet;
			_packet_alloc = false;
		}
	}
	inline bool isRtp() {
		return(IS_RTP(data_(), datalen_()));
	}
	inline bool isStun() {
		return(IS_STUN(data_(), datalen_()));
	}
	inline bool isDtls() {
		return(IS_DTLS(data_(), datalen_()));
	}
	inline bool isUdptl() {
		return(!IS_RTP(data_(), datalen_()));
	}
	inline bool okDataLenForRtp() {
		return(datalen_() > 12);
	}
	inline bool okDataLenForUdptl() {
		return(datalen_() > 3);
	}
	inline bool isRtpOkDataLen() {
		return(isRtp() && okDataLenForRtp());
	}
	inline bool isUdptlOkDataLen() {
		return(isUdptl() && okDataLenForUdptl());
	}
	inline bool isRtpUdptlOkDataLen() {
		return(isRtp() ? okDataLenForRtp() : okDataLenForUdptl());
	}
};

struct packet_s_stack : public packet_s {
	cHeapItemsPointerStack *stack;
	inline packet_s_stack() {
		__type = _t_packet_s_stack; 
		init();
	}
	inline void init() {
		packet_s::init();
		stack = NULL;
	}
	inline void term() {
		packet_s::term();
	}
};

struct packet_s_plus_pointer : public packet_s {
	inline packet_s_plus_pointer() {
		__type = _t_packet_s_plus_pointer;
	}
	void *pointer[2];
};

struct packet_s_process_rtp_call_info {
	Call *call;
	int8_t iscaller;
	bool is_rtcp;
	s_sdp_flags sdp_flags;
	bool use_sync;
	bool multiple_calls;
};

struct packet_s_process_0 : public packet_s_stack {
	volatile u_int8_t use_reuse_counter;
	volatile u_int8_t reuse_counter;
	volatile u_int8_t reuse_counter_sync;
	int isSip;
	bool isSkinny;
	bool isMgcp;
	packet_s_process_rtp_call_info call_info[MAX_LENGTH_CALL_INFO];
	int call_info_length;
	bool call_info_find_by_dest;
	inline packet_s_process_0() {
		__type = _t_packet_s_process_0; 
		init();
		init2();
	}
	inline void init() {
		packet_s_stack::init();
		use_reuse_counter = 0;
	}
	inline void init_reuse() {
		use_reuse_counter = 0;
		reuse_counter = 0;
		reuse_counter_sync = 0;
	}
	inline void init2() {
		isSip = -1;
		isSkinny = false;
		isMgcp = false;
		call_info_length = -1;
		init_reuse();
	}
	inline void init2_rtp() {
		call_info_length = -1;
		init_reuse();
	}
	inline void term() {
		packet_s_stack::term();
	}
	inline void new_alloc_packet_header() {
		pcap_pkthdr *header_pt_new = new FILE_LINE(27001) pcap_pkthdr;
		u_char *packet_new = new FILE_LINE(27002) u_char[header_pt->caplen];
		*header_pt_new = *header_pt;
		memcpy(packet_new, packet, header_pt->caplen);
		header_pt = header_pt_new;
		packet = packet_new;
	}
	inline void set_use_reuse_counter() {
		use_reuse_counter = 1;
	}
	inline bool is_use_reuse_counter() {
		return(use_reuse_counter);
	}
	inline void reuse_counter_inc_sync(u_int8_t inc = 1) {
		__sync_add_and_fetch(&reuse_counter, inc);
	}
	inline void reuse_counter_dec() {
		--reuse_counter;
	}
	inline void reuse_counter_lock() {
		while(__sync_lock_test_and_set(&reuse_counter_sync, 1));
	}
	inline void reuse_counter_unlock() {
		__sync_lock_release(&reuse_counter_sync);
	}
};

struct packet_s_process : public packet_s_process_0 {
	ParsePacket::ppContentsX parseContents;
	u_int32_t sipDataOffset;
	u_int32_t sipDataLen;
	char callid[128];
	char *callid_long;
	vector<string> *callid_alternative;
	int sip_method;
	sCseq cseq;
	bool sip_response;
	int lastSIPresponseNum;
	char lastSIPresponse[128];
	bool call_cancel_lsr487;
	Call *call;
	int merged;
	Call *call_created;
	bool _getCallID : 1;
	bool _getSipMethod : 1;
	bool _getLastSipResponse : 1;
	bool _findCall : 1;
	bool _createCall : 1;
	bool _customHeadersDone : 1;
	inline packet_s_process() {
		__type = _t_packet_s_process; 
		init();
		init2();
	}
	inline void init() {
		packet_s_process_0::init();
	}
	inline void init2() {
		packet_s_process_0::init2();
		sipDataOffset = 0;
		sipDataLen = 0;
		callid[0] = 0;
		callid_long = NULL;
		callid_alternative = NULL;
		sip_method = -1;
		cseq.null();
		sip_response = false;
		lastSIPresponseNum = -1;
		lastSIPresponse[0] = 0;
		call_cancel_lsr487 = false;
		call = NULL;
		merged = 0;
		call_created = NULL;
		_getCallID = false;
		_getSipMethod = false;
		_getLastSipResponse = false;
		_findCall = false;
		_createCall = false;
		_customHeadersDone = false;
	}
	inline void term() {
		packet_s_process_0::term();
		if(callid_long) {
			delete [] callid_long;
			callid_long = NULL;
		}
		if(callid_alternative) {
			delete callid_alternative;
			callid_alternative = NULL;
		}
	}
	void set_callid(char *callid_input, unsigned callid_length = 0) {
		if(!callid_length) {
			callid_length = strlen(callid_input);
		}
		if(callid_length > sizeof(callid) - 1) {
			callid_long = new FILE_LINE(0) char[callid_length + 1];
			strncpy(callid_long, callid_input, callid_length);
			callid_long[callid_length] = 0;
		} else {
			strncpy(callid, callid_input, callid_length);
			callid[callid_length] = 0;
		}
	}
	void set_callid_alternative(char *callid, unsigned callid_length) {
		if(!callid_alternative) {
			callid_alternative = new FILE_LINE(0) vector<string>;
		}
		char *separator = strnchr(callid, ';', callid_length);
		if(separator) {
			callid_length = separator - callid;
		}
		if(callid_length) {
			bool ok = false;
			for(unsigned i = 0; i < callid_length; i++) {
				if(callid[i] != '0') {
					ok = true;
				}
			}
			if(ok) {
				callid_alternative->push_back(string(callid, callid_length));
			}
		}
	}
	inline char *get_callid() {
		return(callid_long ? callid_long : callid);
	}
	inline bool is_message() {
		return(sip_method == MESSAGE || cseq.method == MESSAGE);
	}
	inline bool is_register() {
		return(sip_method == REGISTER || cseq.method == REGISTER);
	}
	inline bool is_options() {
		return(sip_method == OPTIONS || cseq.method == OPTIONS);
	}
	inline bool is_notify() {
		return(sip_method == NOTIFY || cseq.method == NOTIFY);
	}
	inline bool is_subscribe() {
		return(sip_method == SUBSCRIBE || cseq.method == SUBSCRIBE);
	}
};


void save_packet(Call *call, packet_s *packetS, int type, u_int8_t forceVirtualUdp = false);
void save_packet(Call *call, packet_s_process *packetS, int type, u_int8_t forceVirtualUdp = false);


typedef struct {
	Call *call;
	packet_s_process_0 *packet;
	int8_t iscaller;
	char find_by_dest;
	char is_rtcp;
	char stream_in_multiple_calls;
	char is_fax;
	char save_packet;
} rtp_packet_pcap_queue;

class rtp_read_thread {
public:
	#if DEBUG_QUEUE_RTP_THREAD
	struct thread_debug_data {
		//packet_s_process_0 packets[1000];
		unsigned counter;
		unsigned process_counter;
		unsigned tid;
	};
	#endif
	struct batch_packet_rtp_base {
		batch_packet_rtp_base(unsigned max_count) {
			batch = new FILE_LINE(0) rtp_packet_pcap_queue[max_count];
			memset(CAST_OBJ_TO_VOID(batch), 0, sizeof(rtp_packet_pcap_queue) * max_count);
			this->max_count = max_count;
		}
		virtual ~batch_packet_rtp_base() {
			for(unsigned i = 0; i < max_count; i++) {
				// unlock item
			}
			delete [] batch;
		}
		rtp_packet_pcap_queue *batch;
		unsigned max_count;
	};
	struct batch_packet_rtp : public batch_packet_rtp_base {
		batch_packet_rtp(unsigned max_count) : batch_packet_rtp_base(max_count) {
			count = 0;
			used = 0;
		}
		volatile unsigned count;
		volatile int used;
	};
	struct batch_packet_rtp_thread_buffer : public batch_packet_rtp_base {
		batch_packet_rtp_thread_buffer(unsigned max_count) : batch_packet_rtp_base(max_count) {
			count = 0;
		}
		unsigned count;
	};
public:
	rtp_read_thread()  {
		this->calls = 0;
	}
	void init(int threadNum, size_t qring_length);
	void init_qring(size_t qring_length);
	void alloc_qring();
	void init_thread_buffer();
	void term();
	void term_qring();
	void term_thread_buffer();
	size_t qring_size();
	inline void push(Call *call, packet_s_process_0 *packet, int iscaller, bool find_by_dest, int is_rtcp, bool stream_in_multiple_calls, char is_fax, int enable_save_packet, int threadIndex = 0) {
		
		/* destroy and quit - debug
		void PACKET_S_PROCESS_DESTROY(packet_s_process_0 **packet);
		PACKET_S_PROCESS_DESTROY(&packet);
		return;
		*/
		
		extern int opt_t2_boost;
		if(threadIndex && opt_t2_boost) {
		 
			#if DEBUG_QUEUE_RTP_THREAD
			unsigned tid = get_unix_tid();
			if(!tdd[threadIndex-1].tid) {
				tdd[threadIndex-1].tid = tid;
			} else if(tdd[threadIndex-1].tid != tid) {
				syslog(LOG_NOTICE, "RACE in rtp_read_thread(%i)::push - %u / %u", threadNum, tdd[threadIndex-1].tid, tid);
			}
			#endif
		 
			packet->blockstore_addflag(61 /*pb lock flag*/);
			packet->blockstore_addflag(threadNum /*pb lock flag*/);
			packet->blockstore_addflag(threadIndex /*pb lock flag*/);
			
			batch_packet_rtp_thread_buffer *thread_buffer = this->thread_buffer[threadIndex - 1];
			if(thread_buffer->count == thread_buffer->max_count) {
				while(__sync_lock_test_and_set(&this->push_lock_sync, 1));
				packet->blockstore_addflag(62 /*pb lock flag*/);

				/* destroy threadbuffer array - debug
				for(unsigned i = 0; i < thread_buffer->count; i++) {
					thread_buffer->batch.pt[i].packet->blockstore_addflag(64); // pb lock flag
					void PACKET_S_PROCESS_DESTROY(packet_s_process_0 **packet);
					PACKET_S_PROCESS_DESTROY(&thread_buffer->batch.pt[i].packet);
				}
				goto end_thread_buffer_copy;
				*/
				
				batch_packet_rtp *current_batch = this->qring[this->writeit];
				unsigned int usleepCounter = 0;
				while(current_batch->used != 0) {
					USLEEP_C(20, usleepCounter++);
				}
				memcpy(current_batch->batch, thread_buffer->batch, sizeof(rtp_packet_pcap_queue) * thread_buffer->count);
				#if RQUEUE_SAFE
					__SYNC_SET_TO_LOCK(current_batch->count, thread_buffer->count, this->count_lock_sync);
					__SYNC_SET(current_batch->used);
					__SYNC_INCR(this->writeit, this->qring_length);
				#else
					__SYNC_LOCK(this->count_lock_sync);
					current_batch->count = thread_buffer->count;
					__SYNC_UNLOCK(this->count_lock_sync);
					__sync_add_and_fetch(&current_batch->used, 1);
					if((this->writeit + 1) == this->qring_length) {
						this->writeit = 0;
					} else {
						this->writeit++;
					}
				#endif
				
				/* destroy threadbuffer array - debug
				end_thread_buffer_copy:
				*/
				
				thread_buffer->count = 0;
				__sync_lock_release(&this->push_lock_sync);
			}
			rtp_packet_pcap_queue *rtpp_pq = &thread_buffer->batch[thread_buffer->count];
			rtpp_pq->call = call;
			rtpp_pq->packet = packet;
			rtpp_pq->iscaller = iscaller;
			rtpp_pq->find_by_dest = find_by_dest;
			rtpp_pq->is_rtcp = is_rtcp;
			rtpp_pq->stream_in_multiple_calls = stream_in_multiple_calls;
			rtpp_pq->is_fax = is_fax;
			rtpp_pq->save_packet = enable_save_packet;
			packet->blockstore_addflag(63 /*pb lock flag*/);
			thread_buffer->count++;
		} else {
			while(__sync_lock_test_and_set(&this->push_lock_sync, 1));
		 
			#if DEBUG_QUEUE_RTP_THREAD
			unsigned tid = get_unix_tid();
			if(!tdd[0].tid) {
				tdd[0].tid = tid;
			} else if(tdd[0].tid != tid) {
				syslog(LOG_NOTICE, "RACE in rtp_read_thread(%i)::push - %u / %u", threadNum, tdd[0].tid, tid);
			}
			#endif
		 
			packet->blockstore_addflag(61 /*pb lock flag*/);
			packet->blockstore_addflag(threadNum /*pb lock flag*/);
			
			if(!qring_push_index) {
				packet->blockstore_addflag(62 /*pb lock flag*/);
				unsigned int usleepCounter = 0;
				while(this->qring[this->writeit]->used != 0) {
					USLEEP_C(20, usleepCounter++);
				}
				qring_push_index = this->writeit + 1;
				qring_push_index_count = 0;
				qring_active_push_item = this->qring[qring_push_index - 1];
			}
			rtp_packet_pcap_queue *rtpp_pq = &qring_active_push_item->batch[qring_push_index_count];
			rtpp_pq->call = call;
			rtpp_pq->packet = packet;
			rtpp_pq->iscaller = iscaller;
			rtpp_pq->find_by_dest = find_by_dest;
			rtpp_pq->is_rtcp = is_rtcp;
			rtpp_pq->stream_in_multiple_calls = stream_in_multiple_calls;
			rtpp_pq->is_fax = is_fax;
			rtpp_pq->save_packet = enable_save_packet;
			++qring_push_index_count;
			packet->blockstore_addflag(63 /*pb lock flag*/);
			if(qring_push_index_count == qring_active_push_item->max_count) {
				packet->blockstore_addflag(64 /*pb lock flag*/);
				#if RQUEUE_SAFE
					__SYNC_SET_TO_LOCK(qring_active_push_item->count, qring_push_index_count, this->count_lock_sync);
					__SYNC_SET(qring_active_push_item->used);
					__SYNC_INCR(this->writeit, this->qring_length);
				#else
					__SYNC_LOCK(this->count_lock_sync);
					qring_active_push_item->count = qring_push_index_count;
					__SYNC_UNLOCK(this->count_lock_sync);
					qring_active_push_item->used = 1;
					if((this->writeit + 1) == this->qring_length) {
						this->writeit = 0;
					} else {
						this->writeit++;
					}
				#endif
				qring_push_index = 0;
				qring_push_index_count = 0;
			}
			__sync_lock_release(&this->push_lock_sync);
		}
	}
	inline void push_batch() {
		while(__sync_lock_test_and_set(&this->push_lock_sync, 1));
	 
		#if DEBUG_QUEUE_RTP_THREAD
		unsigned tid = get_unix_tid();
		if(!tdd[0].tid) {
			tdd[0].tid = tid;
		} else if(tdd[0].tid != tid) {
			syslog(LOG_NOTICE, "RACE in rtp_read_thread(%i)::push_batch - %u / %u", threadNum, tdd[0].tid, tid);
		}
		#endif
			
		if(qring_push_index_count) {
			#if RQUEUE_SAFE
				__SYNC_SET_TO_LOCK(qring_active_push_item->count, qring_push_index_count, this->count_lock_sync);
				__SYNC_SET(qring_active_push_item->used);
				__SYNC_INCR(this->writeit, this->qring_length);
			#else
				__SYNC_LOCK(this->count_lock_sync);
				qring_active_push_item->count = qring_push_index_count;
				__SYNC_UNLOCK(this->count_lock_sync);
				qring_active_push_item->used = 1;
				if((this->writeit + 1) == this->qring_length) {
					this->writeit = 0;
				} else {
					this->writeit++;
				}
			#endif
			qring_push_index = 0;
			qring_push_index_count = 0;
		}
		__sync_lock_release(&this->push_lock_sync);
	}
	inline void push_thread_buffer(int threadIndex) {
	 
		#if DEBUG_QUEUE_RTP_THREAD
		unsigned tid = get_unix_tid();
		if(!tdd[threadIndex].tid) {
			tdd[threadIndex].tid = tid;
		} else if(tdd[threadIndex].tid != tid) {
			syslog(LOG_NOTICE, "RACE in rtp_read_thread(%i)::push_thread_buffer - %u / %u", threadNum, tdd[threadIndex].tid, tid);
		}
		#endif
			
		batch_packet_rtp_thread_buffer *thread_buffer = this->thread_buffer[threadIndex];
		if(thread_buffer->count) {
		 
			#if DEBUG_QUEUE_RTP_THREAD
			syslog(LOG_NOTICE, "push_thread_buffer in rtp_read_thread(%i) - %i", threadNum, threadIndex);
			#endif
		 
			while(__sync_lock_test_and_set(&this->push_lock_sync, 1));
			batch_packet_rtp *current_batch = this->qring[this->writeit];
			unsigned int usleepCounter = 0;
			while(current_batch->used != 0) {
				USLEEP_C(20, usleepCounter++);
			}
			memcpy(current_batch->batch, thread_buffer->batch, sizeof(rtp_packet_pcap_queue) * thread_buffer->count);
			#if RQUEUE_SAFE
				__SYNC_SET_TO_LOCK(current_batch->count, thread_buffer->count, this->count_lock_sync);
				__SYNC_SET(current_batch->used);
				__SYNC_INCR(this->writeit, this->qring_length);
			#else
				__SYNC_LOCK(this->count_lock_sync);
				current_batch->count = thread_buffer->count;
				__SYNC_UNLOCK(this->count_lock_sync);
				current_batch->used = 1;
				if((this->writeit + 1) == this->qring_length) {
					this->writeit = 0;
				} else {
					this->writeit++;
				}
			#endif
			thread_buffer->count = 0;
			__sync_lock_release(&this->push_lock_sync);
		}
	}
public:
	pthread_t thread;
	volatile int threadId;
	int threadNum;
	unsigned int qring_batch_item_length;
	unsigned int qring_length;
	batch_packet_rtp **qring;
	unsigned int thread_buffer_length;
	batch_packet_rtp_thread_buffer **thread_buffer;
	#if DEBUG_QUEUE_RTP_THREAD
	thread_debug_data *tdd;
	#endif
	batch_packet_rtp *qring_active_push_item;
	volatile unsigned qring_push_index;
	volatile unsigned qring_push_index_count;
	volatile unsigned int readit;
	volatile unsigned int writeit;
	pstat_data threadPstatData[2];
	volatile bool remove_flag;
	u_int32_t last_use_time_s;
	volatile u_int32_t calls;
	volatile int push_lock_sync;
	volatile int count_lock_sync;
};

#define MAXLIVEFILTERS 10
#define MAXLIVEFILTERSCHARS 64

typedef struct livesnifferfilter_s {
	struct state_s {
		bool all_saddr;
		bool all_daddr;
		bool all_bothaddr;
		bool all_bothport;
		bool all_addr;
		bool all_srcnum;
		bool all_dstnum;
		bool all_bothnum;
		bool all_num;
                bool all_fromhstr;
                bool all_tohstr;
                bool all_bothhstr;
                bool all_hstr;
                bool all_vlan;
		bool all_siptypes;
		bool all_all;
	};
	int sensor_id;
	bool sensor_id_set;
        vmIP lv_saddr[MAXLIVEFILTERS];
        vmIP lv_daddr[MAXLIVEFILTERS];
	vmIP lv_bothaddr[MAXLIVEFILTERS];
        vmIP lv_smask[MAXLIVEFILTERS];
        vmIP lv_dmask[MAXLIVEFILTERS];
	vmIP lv_bothmask[MAXLIVEFILTERS];
	vmPort lv_bothport[MAXLIVEFILTERS];
        char lv_srcnum[MAXLIVEFILTERS][MAXLIVEFILTERSCHARS];
        char lv_dstnum[MAXLIVEFILTERS][MAXLIVEFILTERSCHARS];
	char lv_bothnum[MAXLIVEFILTERS][MAXLIVEFILTERSCHARS];
        char lv_fromhstr[MAXLIVEFILTERS][MAXLIVEFILTERSCHARS];
        char lv_tohstr[MAXLIVEFILTERS][MAXLIVEFILTERSCHARS];
        char lv_bothhstr[MAXLIVEFILTERS][MAXLIVEFILTERSCHARS];
        int lv_vlan[MAXLIVEFILTERS];
	bool lv_vlan_set[MAXLIVEFILTERS];
	unsigned char lv_siptypes[MAXLIVEFILTERS];
        int uid;
        time_t created_at;
	state_s state;
	SimpleBuffer parameters;
	void updateState();
	string getStringState();
} livesnifferfilter_t;

struct livesnifferfilter_use_siptypes_s {
	bool u_invite;
	bool u_register;
	bool u_options;
	bool u_subscribe;
	bool u_message;
	bool u_notify;
};

struct gre_hdr {
#if defined(__LITTLE_ENDIAN_BITFIELD)
#ifdef FREEBSD
        u_int16_t rec:3,
#else
        __u16   rec:3,
#endif
                srr:1,
                seq:1,
                key:1,
                routing:1,
                csum:1,
                version:3,
                reserved:4,
                ack:1;
#elif defined(__BIG_ENDIAN_BITFIELD)
#ifdef FREEBSD
        u_int16_t   csum:1,
#else
	__u16   csum:1,
#endif
                routing:1,
                key:1,
                seq:1,
                srr:1,
                rec:3,
                ack:1,
                reserved:4,
                version:3;
#else
#error "Adjust your <asm/byteorder.h> defines"
#endif
#ifdef FREEBSD
        u_int16_t  protocol;
#else
	__be16	protocol;
#endif
};


void _process_packet__cleanup_calls();
void _process_packet__cleanup_registers();


#define enable_save_sip(call)		(call->flags & FLAG_SAVESIP)
#define enable_save_register(call)	(call->flags & FLAG_SAVEREGISTER)
#define enable_save_rtcp(call)		((call->flags & FLAG_SAVERTCP) || (call->isfax && opt_saveudptl))
#define enable_save_rtp(call)		((call->flags & (FLAG_SAVERTP | FLAG_SAVERTPHEADER)) || (call->isfax && opt_saveudptl) || opt_saverfc2833)
#define enable_save_sip_rtp(call)	(enable_save_sip(call) || enable_save_rtp(call))
#define enable_save_packet(call)	(enable_save_sip(call) || enable_save_register(call) || enable_save_rtp(call))
#define enable_save_audio(call)		((call->flags & FLAG_SAVEAUDIO) || opt_savewav_force)
#define enable_save_sip_rtp_audio(call)	(enable_save_sip_rtp(call) || enable_save_audio(call))
#define enable_save_any(call)		(enable_save_packet(call) || enable_save_audio(call))


void trace_call(u_char *packet, unsigned caplen, int pcapLinkHeaderType,
		unsigned header_ip_offset, u_int64_t packet_time, 
		u_char *data, unsigned datalen,
		const char *file, unsigned line, const char *function, const char *descr = NULL);


#endif
