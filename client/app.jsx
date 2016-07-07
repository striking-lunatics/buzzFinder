class RepoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6">
                        <h2 className="text-center">GitHub Fetcher</h2>
                        <form className="repo-fetcher">
                            <input
                              className="form-control"
                              type="text"
                              name="username"
                              onChange={(e) => this.setState({username: e.target.value})}
                             />
                            <button
                              className="btn btn-primary btn-block"
                              type="submit"
                              onClick={this._handleSubmit.bind(this)}>Fetch User's Repos
                            </button>
                        </form>
                        <RepoList/>
                    </div>
                </div>
            </div>
        );
    }

    _handleSubmit(e) {
        e.preventDefault();
        this._requestJSON()
    }

    _requestJSON() {
        const KEY = 'b47ccd5b17e5e8d93fa8a6c9a230b0820994678e';
        const username = this.state.username;
        const URL = `https://api.github.com/users/${username}/repos?access_token=${KEY}`;

        $.ajax({
            url: URL,
            complete: (data) => this._postReposData(data.responseJSON)
        });
    }

    _postReposData(ReposData) {

        ReposData = ReposData.map((repo) => {
            //console.log(repo.svn_url)
            return {name: repo.name, owner: repo.owner.login, stargazers: repo.stargazers_count, url: repo.svn_url};
        });

        $.ajax({
            url: '/repos/import',
            type: "POST",
            data: JSON.stringify(ReposData),
            dataType: "json",
            contentType: "application/json",
            error: (err) => console.log('sendGithubDataExpressServer', err.responseText)
        })
    }
}

class RepoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            repos: []
        };
    }
    componentWillMount() {
        this._fetchRepos();
    }

    render() {
        return (
            <div>
                <div className="list-group top-repos">
                    {this._createRepoItem()}
                </div>
            </div>
        );
    }

    _fetchRepos() {
        $.ajax({
            url: '/repos',
            complete: (data) => {
                this.setState({repos: data.responseJSON});
            }
        });
    }

    _createRepoItem() {
        return this.state.repos.map((repo, index) => {
            console.log(repo)
            return <RepoItem
                      key={index}
                      name={repo.reposname}
                      url={repo.url}
                      owner={repo.owner}
                      stargazers={repo.stargazers}
                    />
        });
    }

}

class RepoItem extends React.Component {
    render() {
        console.log(this.props.name)
        return (
            <div>
                <a className="list-group-item" href={this.props.url}>
                    {this.props.name}
                    <span className="pull-right">{this.props.stargazers}</span>
                </a>
            </div>
        );
    }
}

ReactDOM.render(
    <RepoApp/>, document.getElementById('app'))
