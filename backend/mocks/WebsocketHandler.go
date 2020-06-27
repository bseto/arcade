// Code generated by mockery v1.0.0. DO NOT EDIT.

package mocks

import (
	http "net/http"

	identifier "github.com/bseto/arcade/backend/websocket/identifier"
	mock "github.com/stretchr/testify/mock"

	websocket "github.com/gorilla/websocket"
)

// WebsocketHandler is an autogenerated mock type for the WebsocketHandler type
type WebsocketHandler struct {
	mock.Mock
}

// HandleAuthentication provides a mock function with given fields: w, r, conn, send
func (_m *WebsocketHandler) HandleAuthentication(w http.ResponseWriter, r *http.Request, conn *websocket.Conn, send chan []byte) (identifier.Client, error) {
	ret := _m.Called(w, r, conn, send)

	var r0 identifier.Client
	if rf, ok := ret.Get(0).(func(http.ResponseWriter, *http.Request, *websocket.Conn, chan []byte) identifier.Client); ok {
		r0 = rf(w, r, conn, send)
	} else {
		r0 = ret.Get(0).(identifier.Client)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(http.ResponseWriter, *http.Request, *websocket.Conn, chan []byte) error); ok {
		r1 = rf(w, r, conn, send)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// HandleMessage provides a mock function with given fields: messageType, message, clientID, err
func (_m *WebsocketHandler) HandleMessage(messageType int, message []byte, clientID identifier.Client, err error) {
	_m.Called(messageType, message, clientID, err)
}

// SignalClose provides a mock function with given fields:
func (_m *WebsocketHandler) SignalClose() {
	_m.Called()
}

// Upgrader provides a mock function with given fields:
func (_m *WebsocketHandler) Upgrader() *websocket.Upgrader {
	ret := _m.Called()

	var r0 *websocket.Upgrader
	if rf, ok := ret.Get(0).(func() *websocket.Upgrader); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*websocket.Upgrader)
		}
	}

	return r0
}
