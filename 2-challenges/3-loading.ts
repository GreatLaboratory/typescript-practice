{
    type LoadingStateType = {
        state: 'loading',
    }

    type SuccessStateType = {
        state: 'success',
        response: {
            body: string;
        }
    }

    type FailStateType = {
        state: 'fail',
        reason: string;
    }

    type ResourceLoadStateType = LoadingStateType | SuccessStateType | FailStateType;

    const printLoadState = (resouceLoadState: ResourceLoadStateType) => {
        switch (resouceLoadState.state) {
            case 'loading':
                console.log(resouceLoadState.state);
                break;
            case 'success':
                console.log(resouceLoadState.response.body);
                break;
            case 'fail':
                console.log(resouceLoadState.reason);
                break;
            default:
                throw new Error('unknown resouce state');
        }
    }

    printLoadState({ state: 'loading' })
    printLoadState({ state: 'success', response: { body: 'loaded!' } })
    printLoadState({ state: 'fail', reason: 'no network' })
}