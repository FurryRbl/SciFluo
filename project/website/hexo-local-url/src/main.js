'use strict';

if (hexo.env.cmd === 'server') {
	//hexo.config.url = `http://${hexo.config.server.ip || 'localhost'}:${hexo.config.server.port}`;
	hexo.config.url = `http://${hexo.config.server.ip || 'localhost'}:8200`;
}
