export const devConfig = {
	serverUrl: 'https://im-server-dev-4oehqieqgq-el.a.run.app/im'
}

export const stagConfig = {
	serverUrl: 'https://im-server-stage-4oehqieqgq-el.a.run.app/im'
}

export const prodConfig = {
	serverUrl: 'https://im-server-prod-4oehqieqgq-el.a.run.app/im'
}

export default process.env.NEXT_PUBLIC_ENV === 'prod'
    ? prodConfig
    : process.env.NEXT_PUBLIC_ENV === 'stag'
    ? stagConfig
    : devConfig;
