package kr.co.J2SM.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    // STOMP/WebSocket 엔드포인트 및 브로커 설정

    /*
    * WebSocketMessageBrokerConfigurationSupport :
    * Spring이 WebSocket 메시지 브로커 기반 통신을 활성화하도록 지시합니다.
    * */

    /*
    * implements WebSocketMessageBrokerConfigurer
    * STOMP 엔드포인트, 브로커 옵션 등을 커스터마이징할 수 있는 콜백 인터페이스입니다.
     * */

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
                .addEndpoint("/ws-chat")
                .setAllowedOriginPatterns(
                        "*"
                        //"http://127.0.0.1:5173",
                        //"http://localhost:5173",
                        //"http://localhost:5174",
                        //"https://j2sm-g4rr2iziz-greenlotte6s-projects.vercel.app"
                )
                .withSockJS();
    }

    /*
    * addEndpoint("/ws-chat")
    * 클라이언트가 WebSocket 또는 SockJS로 연결을 시도할 엔드포인트 URL 입니다.
    *
    * setAllowedOriginPatterns(...)
    * WebSocket 핸드셰이크 요청에 대한 CORS 허용 도메인 패턴을 지정합니다.
    * 와일드카드나 포트·서브도메인 지정이 가능합니다.
    * */

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // "/topic" 으로 시작하는 목적지는 브로커(Simple)로 전달
        registry.enableSimpleBroker("/topic", "/queue");
        // 클라이언트가 @MessageMapping을 호출할 때 접두어
        registry.setApplicationDestinationPrefixes("/app");
        // 3) @SendToUser 가 붙는 사용자별 대상 prefix
        registry.setUserDestinationPrefix("/user");
        // @SendToUser 로 보낸 메시지는 /user/queue/... 로 매핑되어 해당 세션에 전달됩니다.
    }

    /*
     * 메시지 브로커는 메시지를 발행하는 쪽(생산하는 쪽) (생산자, Producer)
     * 구독하는 쪽(Subscribe) 사이에서 중개자 역할을 하는 컴포넌트
     *
     * 1. 발행–구독 모델(Pub/Sub):
     * 생산자는 “이 주제(토픽)에 이런 메시지가 왔어요” 라고 브로커에 보내고,
     * 브로커는 그 주제를 구독 중인 모든 소비자에게 메시지를 전달합니다.
     *
     * 2. 비동기 전달
     * 생산자와 소비자가 직접 연결되지 않고, 브로커를 통해 비동기적으로 통신합니다.
     *
     * 3. 부하 분산 & 확장성
     * 여러 소비자를 붙여서 부하를 나눠 처리하거나,
     * 여러 인스턴스의 애플리케이션이 단일 브로커에 연결되어 메시지를 공유할 수 있습니다.
     */


    /*
    * Spring의 Simple Broker vs. 외부 브로커
    * SimpleBroker :
    * registry.enableSimpleBroker("/topic") 로 켜는, 메모리 기반의 경량 브로커
    * 프로덕션 레벨의 내구성(영속 저장)이나 고급 라우팅 기능은 없지만,
    * 소규모 서비스나 개발/테스트 용으로 STOMP 메시지 전달만 빠르게 처리해 줍니다.
    *
    * 외부 메시지 브로커
    * RabbitMQ, ActiveMQ, Kafka 등의 전용 미들웨어
    * 메시지를 디스크에 영속화, 복제, 트랜잭션 보장, 복잡한 라우팅·필터링, 모니터링 기능 제공
    * Spring에서는 registry.enableStompBrokerRelay(...) 로 외부 브로커와 연동할 수 있습니다.
    * */
}
